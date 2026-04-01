import "@workspace/lib/env";
import { kafka } from "@workspace/lib/kafka";
import { logger } from "@workspace/lib/logger";
import { cache } from "@workspace/lib";
import { bulkWrite } from "./bulkWrite";
import type { UnderProcessingPictureType } from "@workspace/types";

const consumer = kafka.consumer({ groupId: "worker-db-write" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ["picture-ready-for-DB-write"],
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
      logger.info("batch received...");
      const parsedMessages: UnderProcessingPictureType[] = [];

      for (const message of batch.messages) {
        if (!isRunning() || isStale()) break;

        try {
          const value = message.value?.toString();
          if (!value) {
            resolveOffset(message.offset);
            continue;
          }
          const parsed: UnderProcessingPictureType = JSON.parse(value);
          parsedMessages.push(parsed);
        } catch (err) {
          logger.error("JSON parse error:", err);
          resolveOffset(message.offset);
        }
      }

      try {
        if (parsedMessages.length > 0) {
          logger.info(`Processing ${parsedMessages.length} messages...`);

          await heartbeat();

          await bulkWrite(parsedMessages);

          logger.info("Batch processed successfully");
        }

        for (const message of batch.messages) {
          resolveOffset(message.offset);
        }

        const pipeline = cache.pipeline();

        for (const message of parsedMessages) {
          pipeline.hset(
            `picture:upload:${message.userId}`,
            message.id,
            JSON.stringify({ ...message, processing: "done" }),
          );
          pipeline.del(`user:${message.userId}:profile`);
          pipeline.expire(`picture:upload:${message.userId}`, 60 * 60 * 2);
        }

        await pipeline.exec();

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
