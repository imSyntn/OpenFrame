import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { cache } from "@workspace/lib";
import { bulkWrite } from "./bulkWrite";

const consumer = kafka.consumer({ groupId: "worker-db-write" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ["picture-ready-for-DB-write"],
    fromBeginning: true,
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
      console.log("batch received...");
      const parsedMessages = [];

      for (const message of batch.messages) {
        if (!isRunning() || isStale()) break;

        try {
          const value = message.value?.toString();
          if (!value) {
            resolveOffset(message.offset);
            continue;
          }
          const parsed = JSON.parse(value);
          parsedMessages.push(parsed);
        } catch (err) {
          console.error("JSON parse error:", err);
          resolveOffset(message.offset);
        }
      }

      try {
        if (parsedMessages.length > 0) {
          console.log(`Processing ${parsedMessages.length} messages...`);

          await heartbeat();

          await bulkWrite(parsedMessages);

          console.log("Batch processed successfully");
        }

        for (const message of batch.messages) {
          resolveOffset(message.offset);
        }

        await commitOffsetsIfNecessary();
      } catch (err) {
        console.error("Batch failed", err);

        return;
      }

      await heartbeat();
    },
  });
};

run().catch((err) => {
  console.error("Crashed", err);
  process.exit(1);
});
