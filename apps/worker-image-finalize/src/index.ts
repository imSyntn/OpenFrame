import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { cache } from "@workspace/lib";

const REQUIRED_STEPS = ["metadata", "blurhash", "dominant_color", "variants"];

const consumer = kafka.consumer({ groupId: "worker-image-finalize" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ["metadata-extraction-complete", "processing-complete"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      let data: any;

      try {
        data = JSON.parse(message.value?.toString() || "{}");
      } catch (err) {
        console.error("Invalid JSON", {
          topic,
          partition,
          value: message.value?.toString(),
        });
        return;
      }

      const availableInCache = await cache.hget("picture:upload", data.userId);
      if (!availableInCache) return;

      let parsed: any[];
      try {
        parsed = JSON.parse(availableInCache);
      } catch {
        console.error("Corrupted cache data", { userId: data.userId });
        return;
      }

      let obj = parsed.find((i: any) => i.id === data.id);
      if (!obj) return;

      const steps = obj.stepsCompleted || [];
      const isComplete = REQUIRED_STEPS.every((step) => steps.includes(step));

      if (!isComplete) return;

      if (steps.includes("finalized")) return;

      const updatedCache = parsed.map((item: any) => {
        if (item.id === data.id) {
          const updated = {
            ...item,
            stepsCompleted: [...item.stepsCompleted, "finalized"],
            processing: "ready",
          };
          obj = updated;
          return updated;
        } else {
          return item;
        }
      });

      await cache.hset(
        "picture:upload",
        data.userId,
        JSON.stringify(updatedCache),
      );

      await kafkaProduceMessage(
        "picture-ready-for-DB-write",
        JSON.stringify({ ...obj, userId: data.userId }),
      );
    },
  });
};

run().catch((err) => {
  console.error("Crashed", err);
  process.exit(1);
});
