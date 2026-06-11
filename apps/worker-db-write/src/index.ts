import "@workspace/lib/env";
import { kafka } from "@workspace/lib/kafka";
import { logger } from "@workspace/lib/logger";
import { cache } from "@workspace/lib/redis";
import { bulkWrite } from "./bulkWrite";
import { engagementBulkWrite } from "./engagementBulkWrite";
import type {
  UnderProcessingPictureType,
  EngagementEventType,
} from "@workspace/types";
import { updatePicturesSearchData, updateTagsSearchData } from "./updateSearch";

const consumer = kafka.consumer({ groupId: "worker-db-write" });
class WriteError extends Error {}

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "db-write",
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
      const pictureMessages: UnderProcessingPictureType[] = [];
      const engagementMessages: EngagementEventType[] = [];

      for (const message of batch.messages) {
        if (!isRunning() || isStale()) break;

        try {
          const value = message.value?.toString();
          if (!value) {
            resolveOffset(message.offset);
            continue;
          }

          const envelope = JSON.parse(value);

          if (envelope.action === "picture-write") {
            pictureMessages.push(envelope.data as UnderProcessingPictureType);
          } else if (envelope.action === "engagement-event") {
            engagementMessages.push(envelope.data as EngagementEventType);
          } else {
            logger.warn("Unknown action:", envelope.action);
            resolveOffset(message.offset);
          }
        } catch (err) {
          logger.error("JSON parse error:", err);
          resolveOffset(message.offset);
        }
      }

      try {
        if (pictureMessages.length > 0) {
          logger.info(
            `Processing ${pictureMessages.length} picture messages...`,
          );
          await heartbeat();

          try {
            await bulkWrite(pictureMessages);

            const pipeline = cache.pipeline();

            for (const message of pictureMessages) {
              pipeline.hset(
                `picture:upload:${message.userId}`,
                message.id,
                JSON.stringify({ ...message, processing: "done" }),
              );
              pipeline.del(`user:profile:${message.userId}`);
              pipeline.del(`user:pictures:${message.userId}:-1`);
            }

            await pipeline.exec();

            await updatePicturesSearchData(pictureMessages);
            await updateTagsSearchData(pictureMessages);

            logger.info("Picture write completed");
          } catch (err: any) {
            logger.error("picture-write-failed", err);
            throw new WriteError(err.message);
          }
        }

        if (engagementMessages.length > 0) {
          logger.info(
            `Processing ${engagementMessages.length} engagement messages...`,
          );

          const likeMessages = engagementMessages.filter(
            (msg) => msg.type === "like",
          );
          const viewMessages = engagementMessages.filter(
            (msg) => msg.type === "view",
          );
          const downloadMessages = engagementMessages.filter(
            (msg) => msg.type === "download",
          );

          await heartbeat();

          await engagementBulkWrite(
            likeMessages,
            viewMessages,
            downloadMessages,
          );

          logger.info("Engagement write completed");
        }

        for (const message of batch.messages) {
          resolveOffset(message.offset);
        }

        await commitOffsetsIfNecessary();
        logger.info("Batch processed successfully");
      } catch (err: any) {
        logger.error("Batch failed", err);
        const pipeline = cache.pipeline();
        if (err instanceof WriteError) {
          for (const message of pictureMessages) {
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

      await heartbeat();
    },
  });
};

run().catch((err) => {
  logger.error("Crashed", err);
  process.exit(1);
});
