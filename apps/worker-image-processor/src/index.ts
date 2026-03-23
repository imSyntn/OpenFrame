import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { cache } from "@workspace/lib";

const consumer = kafka.consumer({ groupId: "worker-metadata" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "picture-upload", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {},
  });
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
