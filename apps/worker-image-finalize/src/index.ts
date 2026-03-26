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
    fromBeginning: true,
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

      const steps = parsed.stepsCompleted || [];
      const isComplete = REQUIRED_STEPS.every((step) => steps.includes(step));

      if (!isComplete) return;

      if (steps.includes("finalized")) return;

      const updatedCache: UnderProcessingPictureType = {
        ...parsed,
        stepsCompleted: [...parsed.stepsCompleted, "finalized"],
        processing: "ready",
      };

      await cache.hset(
        `picture:upload:${data.userId}`,
        data.id,
        JSON.stringify(updatedCache),
      );

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
