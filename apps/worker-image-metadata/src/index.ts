import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { extractMetadata, getBlurHash } from "./metadataExtractor";
import { cache } from "@workspace/lib";

const consumer = kafka.consumer({ groupId: "worker-metadata" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "picture-upload", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value?.toString() || "{}");

      const img = await fetch(data.url);
      const buffer = Buffer.from(await img.arrayBuffer());

      const [metadata, blurhash] = await Promise.all([
        extractMetadata(buffer),
        getBlurHash(buffer),
      ]);

      const updated = {
        ...data,
        metadata: {
          ...metadata,
          blurhash,
        },
        stepsCompleted: ["metadata"],
      };

      const availableInCache = await cache.hget("picture:upload", data.userId);
      const parsed = JSON.parse(availableInCache || "[]");
      const updatedCache = parsed.map((item: any) =>
        item.id === data.id ? updated : item,
      );

      await cache.hset(
        "picture:upload",
        data.userId,
        JSON.stringify(updatedCache),
      );

      await kafkaProduceMessage(
        "metadata-extraction-complete",
        JSON.stringify({ id: data.id, userId: data.userId }),
      );
    },
  });
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
