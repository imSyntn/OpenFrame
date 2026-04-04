import "@workspace/lib/env";
import { kafka } from "@workspace/lib/kafka";
import { logger } from "@workspace/lib/logger";
import { bulkWrite } from "./bulkWrite";
import type { EngagementEventType } from "@workspace/types";

const consumer = kafka.consumer({ groupId: "worker-engagement-db-write" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "engagement-events",
  });

  await consumer.run({
    autoCommit: false,
    eachBatch: async ({
      batch,
      resolveOffset,
      commitOffsetsIfNecessary,
      heartbeat,
      isRunning,
      isStale,
    }) => {
      logger.info("engagement batch received...");
      const parsedMessages: EngagementEventType[] = [];

      for (const message of batch.messages) {
        if (!isRunning() || isStale()) break;

        try {
          const value = message.value?.toString();
          if (!value) {
            resolveOffset(message.offset);
            continue;
          }
          const parsed: EngagementEventType = JSON.parse(value);
          parsedMessages.push(parsed);
        } catch (err) {
          logger.error("JSON parse error:", err);
          resolveOffset(message.offset);
        }
      }

      try {
        if (parsedMessages.length > 0) {
          logger.info(
            `Processing ${parsedMessages.length} engagement messages...`,
          );

          const likeMessages = parsedMessages.filter(
            (message) => message.type === "like",
          );
          const viewMessages = parsedMessages.filter(
            (message) => message.type === "view",
          );
          const downloadMessages = parsedMessages.filter(
            (message) => message.type === "download",
          );

          await heartbeat();

          await bulkWrite(likeMessages, viewMessages, downloadMessages);

          logger.info("Engagement Batch processed successfully");
        }

        for (const message of batch.messages) {
          resolveOffset(message.offset);
        }

        await commitOffsetsIfNecessary();
      } catch (err) {
        logger.error("Batch failed", err);

        return;
      }

      await heartbeat();
    },
  });
};

run().catch((err) => {
  logger.error("Crashed", err);
  process.exit(1);
});
