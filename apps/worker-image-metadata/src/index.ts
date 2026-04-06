import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { logger } from "@workspace/lib/logger";
import {
  extractMetadata,
  getBlurHash,
  getDominantColor,
} from "./metadataExtractor";
import { cache } from "@workspace/lib";
import {
  type MetadataCacheType,
  type UnderProcessingPictureType,
} from "@workspace/types";

const consumer = kafka.consumer({ groupId: "worker-metadata" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "picture-upload", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      let data: UnderProcessingPictureType;

      try {
        data = JSON.parse(message.value?.toString() || "{}");
        logger.info("kafka data", data);
      } catch (err) {
        logger.error("Invalid JSON", {
          topic,
          partition,
          value: message.value?.toString(),
        });
        return;
      }

      const cacheKey = `picture:upload:metadata:${data.userId}:${data.id}`;

      try {
        const metadataCache = await cache.get(cacheKey);
        const parsedMetadataCache: MetadataCacheType = JSON.parse(
          metadataCache || "{}",
        );

        // const availableInCache = await cache.hget(
        //   `picture:upload:${data.userId}`,
        //   data.id,
        // );
        // if (!availableInCache) return;

        // const parsed: UnderProcessingPictureType = JSON.parse(availableInCache);

        if (parsedMetadataCache.status === "done") {
          logger.info("Already processed metadata, skipping", data.id);
          return;
        }

        if (parsedMetadataCache.retry && parsedMetadataCache.retry > 3) {
          logger.error("Max retries reached", data.id);
          return;
        }

        // const metadataCache = await cache.get(
        //   `picture:upload:metadata:${data.userId}:${data.id}`,
        // );
        // const parsedMetadataCache = JSON.parse(metadataCache || "{}");

        const img = await fetch(data.url);
        if (!img.ok) throw new Error("Image fetch failed");

        const buffer = Buffer.from(await img.arrayBuffer());

        const [metadata, blurhash, dominant_color] = await Promise.all([
          extractMetadata(buffer),
          getBlurHash(buffer),
          getDominantColor(buffer),
        ]);

        const updatedCache: MetadataCacheType = {
          metadata: {
            others: metadata,
            blurhash,
            dominant_color: dominant_color as string,
          },
          stepsCompleted: ["metadata", "blurhash", "dominant_color"],
          status: "done",
        };
        await cache.set(
          cacheKey,
          JSON.stringify(updatedCache),
          "EX",
          60 * 60 * 24,
        );

        // await cache.hset(
        //   `picture:upload:${data.userId}`,
        //   data.id,
        //   JSON.stringify(updatedCache),
        // );
        // console.log(updatedCache);

        await kafkaProduceMessage(
          "metadata-extraction-complete",
          JSON.stringify({
            id: data.id,
            userId: data.userId,
          }),
        );
      } catch (err: any) {
        logger.error("Metadata processing failed", {
          id: data?.id,
          error: err.message,
        });
        try {
          const metadataCache = await cache.get(cacheKey);
          const parsed: MetadataCacheType = JSON.parse(metadataCache || "{}");
          const failedCache: MetadataCacheType = {
            ...parsed,
            status: "failed",
            retry: (parsed.retry || 0) + 1,
          };
          await cache.set(
            cacheKey,
            JSON.stringify(failedCache),
            "EX",
            60 * 60 * 24,
          );
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
