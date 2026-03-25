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
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value?.toString() || "{}");

      const availableInCache = await cache.hget("picture:upload", data.userId);
      const parsed = JSON.parse(availableInCache || "[]");

      const item = parsed.find((i: any) => i.id === data.id);
      if (!item) return;

      const steps = item.stepsCompleted || [];
      const isComplete = REQUIRED_STEPS.every((step) => steps.includes(step));

      if (!isComplete) return;

      if (steps.includes("finalized")) return;

      const updatedCache = parsed.map((item: any) => {
        if (item.id === data.id) {
          const updated = {
            ...item,
            stepsCompleted: [...item.stepsCompleted, "finalized"],
          };
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
        JSON.stringify({ id: data.id, userId: data.userId }),
      );
    },
  });
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
