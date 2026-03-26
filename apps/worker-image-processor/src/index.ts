import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { cache } from "@workspace/lib";
import { resizeImage } from "./processImage";
import { uploadVariants } from "./lib/upload";

const consumer = kafka.consumer({ groupId: "worker-processor" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "picture-upload", fromBeginning: true });

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

      try {
        const availableInCache = await cache.hget(
          "picture:upload",
          data.userId,
        );
        if (!availableInCache) return;

        const parsed = JSON.parse(availableInCache);

        const existing = parsed.find((i: any) => i.id === data.id);
        if (!existing) return;

        if (existing.stepsCompleted?.includes("variants")) {
          console.log("Already processed, skipping", data.id);
          return;
        }
        const { original, variants } = await resizeImage(data.url);

        const variantsUploaded = await uploadVariants(data.id, variants);

        const updatedCache = parsed.map((item: any) => {
          if (item.id !== data.id) return item;

          return {
            ...item,
            stepsCompleted: [...item.stepsCompleted, "variants"],
            src: [original, ...variantsUploaded],
          };
        });

        await cache.hset(
          "picture:upload",
          data.userId,
          JSON.stringify(updatedCache),
        );

        await kafkaProduceMessage(
          "processing-complete",
          JSON.stringify({ id: data.id, userId: data.userId }),
        );
      } catch (err: any) {
        console.error("Processing failed", {
          id: data?.id,
          error: err.message,
        });
        throw err;
      }
    },
  });
};

run().catch((err) => {
  console.error("Crashed", err);
  process.exit(1);
});
