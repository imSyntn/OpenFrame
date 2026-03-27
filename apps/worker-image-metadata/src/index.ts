import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { logger } from "@workspace/lib/logger";
import {
  extractMetadata,
  getBlurHash,
  getDominantColor,
} from "./metadataExtractor";
import { cache } from "@workspace/lib";
import { type UnderProcessingPictureType } from "@workspace/types";

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

      try {
        const availableInCache = await cache.hget(
          `picture:upload:${data.userId}`,
          data.id,
        );
        logger.info("cache data", availableInCache);
        if (!availableInCache) return;

        const parsed: UnderProcessingPictureType = JSON.parse(availableInCache);
        logger.info("parsed data", parsed);

        if (
          parsed.stepsCompleted.includes("metadata") &&
          parsed.stepsCompleted.includes("blurhash") &&
          parsed.stepsCompleted.includes("dominant_color")
        ) {
          logger.info("Already processed metadata, skipping", data.id);
          return;
        }

        const img = await fetch(data.url);
        if (!img.ok) throw new Error("Image fetch failed");

        const buffer = Buffer.from(await img.arrayBuffer());

        const [metadata, blurhash, dominant_color] = await Promise.all([
          extractMetadata(buffer),
          getBlurHash(buffer),
          getDominantColor(buffer),
        ]);

        const updatedCache = {
          // ...parsed,
          metadata: {
            others: metadata,
            blurhash,
            dominant_color,
          },
          stepsCompleted: [
            // ...parsed.stepsCompleted,
            "metadata",
            "blurhash",
            "dominant_color",
          ],
        };
        await cache.set(
          `picture:upload:metadata:${data.userId}:${data.id}`,
          JSON.stringify(updatedCache),
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

        throw err;
      }
    },
  });
};

run().catch((err) => {
  logger.error("Crashed", err);
  process.exit(1);
});
