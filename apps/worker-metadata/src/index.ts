import "@workspace/lib/env";
import { kafka } from "@workspace/lib/kafka";
// import { extractMetadata } from "./metadataExtractor";

const consumer = kafka.consumer({ groupId: "worker-metadata" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "picture-upload", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value?.toString() || "{}");
      //   const metadata = await extractMetadata(data.url);
      console.log({
        topic,
        partition,
        message: data,
        // metadata,
      });
    },
  });
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
