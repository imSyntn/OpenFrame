import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { cache } from "@workspace/lib";
import { logger } from "@workspace/lib/logger";
import type { UnderProcessingPictureType } from "@workspace/types";

const REQUIRED_STEPS = ["metadata", "blurhash", "dominant_color", "variants"];

const consumer = kafka.consumer({ groupId: "worker-image-finalize" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ["metadata-extraction-complete", "processing-complete"],
    // fromBeginning: true,
  });

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

      const availableInCache = await cache.hget(
        `picture:upload:${data.userId}`,
        data.id,
      );
      if (!availableInCache) return;

      let parsed: UnderProcessingPictureType;
      try {
        parsed = JSON.parse(availableInCache);
      } catch {
        logger.error("Corrupted cache data", { userId: data.userId });
        return;
      }

      const getMeta = cache.get(
        `picture:upload:metadata:${data.userId}:${data.id}`,
      );
      const getVariants = cache.get(
        `picture:upload:variants:${data.userId}:${data.id}`,
      );

      const [meta, variants] = await Promise.allSettled([getMeta, getVariants]);

      if (meta.status === "rejected" || variants.status === "rejected") {
        logger.error("Failed to get metadata or variants", {
          userId: data.userId,
          id: data.id,
        });
        return;
      } else if (
        meta.status === "fulfilled" &&
        variants.status === "fulfilled"
      ) {
        const metaData = JSON.parse(meta.value as string);
        const variantsData = JSON.parse(variants.value as string);
        if (!metaData || !variantsData) return;
        parsed = {
          ...parsed,
          metadata: metaData.metadata,
          src: variantsData.src,
          stepsCompleted: [
            ...parsed.stepsCompleted,
            ...metaData.stepsCompleted,
            ...variantsData.stepsCompleted,
          ],
        };
      }

      const steps = parsed.stepsCompleted || [];
      const isComplete = REQUIRED_STEPS.every((step) => steps.includes(step));

      if (!isComplete) return;

      if (steps.includes("finalized")) return;

      const updatedCache: UnderProcessingPictureType = {
        ...parsed,
        stepsCompleted: [...parsed.stepsCompleted, "finalized"],
        processing: "ready",
      };

      const pipeline = cache.pipeline();
      pipeline.hset(
        `picture:upload:${data.userId}`,
        data.id,
        JSON.stringify(updatedCache),
      );
      pipeline.del(`picture:upload:metadata:${data.userId}:${data.id}`);
      pipeline.del(`picture:upload:variants:${data.userId}:${data.id}`);
      await pipeline.exec();

      await kafkaProduceMessage(
        "picture-ready-for-DB-write",
        JSON.stringify(updatedCache),
      );
    },
  });
};

run().catch((err) => {
  logger.error("Crashed", err);
  process.exit(1);
});
