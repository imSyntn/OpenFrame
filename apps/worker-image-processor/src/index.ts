import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { cache } from "@workspace/lib";
import { logger } from "@workspace/lib/logger";
import { resizeImage } from "./processImage";
import { uploadVariants } from "./lib/upload";
import { type UnderProcessingPictureType } from "@workspace/types";

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
        logger.error("Invalid JSON", {
          topic,
          partition,
          value: message.value?.toString(),
        });
        return;
      }

      try {
        const availableInCache = await cache.hget(
          `picture:upload:${data.userId}`,
          data.id,
        );
        if (!availableInCache) return;

        const parsed: UnderProcessingPictureType = JSON.parse(availableInCache);

        if (parsed.stepsCompleted?.includes("variants")) {
          logger.info("Already processed, skipping", data.id);
          return;
        }
        const { original, variants } = await resizeImage(data.url);

        const variantsUploaded = await uploadVariants(data.id, variants);

        const updatedCache: UnderProcessingPictureType = {
          ...parsed,
          stepsCompleted: [...parsed.stepsCompleted, "variants"],
          src: [original, ...variantsUploaded],
        };

        await cache.hset(
          `picture:upload:${data.userId}`,
          data.id,
          JSON.stringify(updatedCache),
        );

        await kafkaProduceMessage(
          "processing-complete",
          JSON.stringify({ id: data.id, userId: data.userId }),
        );
      } catch (err: any) {
        logger.error("Processing failed", {
          id: data?.id,
          error: err.message,
        });
        throw err;
      }
    },
  });
};

run().catch((err) => {
  logger.error("Crashed", err);
  process.exit(1);
});
