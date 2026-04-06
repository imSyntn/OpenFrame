import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { cache } from "@workspace/lib";
import { logger } from "@workspace/lib/logger";
import { resizeImage } from "./processImage";
import { uploadVariants } from "./lib/upload";
import {
  type UnderProcessingPictureType,
  type VariantsCacheType,
} from "@workspace/types";

const consumer = kafka.consumer({ groupId: "worker-processor" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "picture-upload", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      let data: UnderProcessingPictureType;
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

      const cacheKey = `picture:upload:variants:${data.userId}:${data.id}`;

      try {
        const variantsCache = await cache.get(cacheKey);
        const parsedVariantsCache: VariantsCacheType = JSON.parse(
          variantsCache || "{}",
        );

        if (parsedVariantsCache.status === "done") {
          logger.info("Already processed, skipping", data.id);
          return;
        }

        if (parsedVariantsCache.retry && parsedVariantsCache.retry > 3) {
          logger.error("Max retries reached", data.id);
          return;
        }

        const { original, variants } = await resizeImage(data.url);

        const variantsUploaded = await uploadVariants(data.id, variants);

        const updatedCache: VariantsCacheType = {
          stepsCompleted: ["variants"],
          src: [original, ...variantsUploaded],
          status: "done",
        };

        await cache.set(cacheKey, JSON.stringify(updatedCache));

        await kafkaProduceMessage(
          "processing-complete",
          JSON.stringify({ id: data.id, userId: data.userId }),
        );
      } catch (err: any) {
        logger.error("Processing failed", {
          id: data?.id,
          error: err.message,
        });

        try {
          const variantsCache = await cache.get(cacheKey);
          const parsed: VariantsCacheType = JSON.parse(variantsCache || "{}");

          const failedCache: VariantsCacheType = {
            ...parsed,
            status: "failed",
            retry: (parsed.retry || 0) + 1,
          };
          await cache.set(cacheKey, JSON.stringify(failedCache));
        } catch (cacheErr) {
          logger.error("Failed to update metadata failure in cache", {
            id: data?.id,
            error: (cacheErr as any).message,
          });
        }
        throw err;
      }
    },
  });
};

run().catch((err) => {
  logger.error("Crashed", err);
  process.exit(1);
});
