import { kafka } from "@workspace/lib/kafka";

export const setupKafka = async () => {
  const admin = kafka.admin();
  await admin.connect();

  console.log("✅ Kafka connected");

  await admin.createTopics({
    topics: [
      { topic: "picture-upload", numPartitions: 2 },
      { topic: "metadata-extraction-complete", numPartitions: 2 },
      { topic: "processing-complete", numPartitions: 1 },
      { topic: "picture-ready-for-DB-write", numPartitions: 1 },
      { topic: "engagement-events", numPartitions: 2 },
    ],
  });

  console.log("✅ Kafka topics created");

  await admin.disconnect();
};
