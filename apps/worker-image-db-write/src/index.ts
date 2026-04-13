import "@workspace/lib/env";
import { kafka } from "@workspace/lib/kafka";
import { logger } from "@workspace/lib/logger";
import { cache } from "@workspace/lib/redis";
import { bulkWrite } from "./bulkWrite";
import type { UnderProcessingPictureType } from "@workspace/types";
import { updatePicturesSearchData, updateTagsSearchData } from "./updateSearch";

const consumer = kafka.consumer({ groupId: "worker-db-write" });
class WriteError extends Error {}

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

          try {
            await bulkWrite(parsedMessages);

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
              pipeline.del(`user:profile:${message.userId}`);
              pipeline.del(`user:pictures:${message.userId}:-1`);
            }

            await pipeline.exec();

            await updatePicturesSearchData(parsedMessages);
            await updateTagsSearchData(parsedMessages);

            await commitOffsetsIfNecessary();

            logger.info("Batch processed successfully");
          } catch (err: any) {
            logger.error("write-failed", err);
            throw new WriteError(err.message);
          }
        }
      } catch (err: any) {
        logger.error("Batch failed", err);
        const pipeline = cache.pipeline();
        if (err instanceof WriteError) {
          for (const message of parsedMessages) {
            pipeline.hset(
              `picture:upload:${message.userId}`,
              message.id,
              JSON.stringify({
                ...message,
                processing: "failed",
                error: "Failed to update DB.",
              }),
            );
          }
        }
        await pipeline.exec();
        throw err;
      }
    },
  });
};

run().catch((err) => {
  logger.error("Crashed", err);
  process.exit(1);
});
