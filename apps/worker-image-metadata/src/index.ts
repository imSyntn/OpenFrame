import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import {
  extractMetadata,
  getBlurHash,
  getDominantColor,
} from "./metadataExtractor";
import { cache } from "@workspace/lib";

const consumer = kafka.consumer({ groupId: "worker-metadata" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "picture-upload", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      let data: any;

      try {
        data = JSON.parse(message.value?.toString() || "{}");
      } catch (err) {
        console.error("Invalid JSON", {
          topic,
          partition,
          value: message.value?.toString(),
        });
        return;
      }

      try {
        const availableInCache = await cache.hget(
          "picture:upload",
          data.userId,
        );
        if (!availableInCache) return;

        const parsed = JSON.parse(availableInCache);

        const existing = parsed.find((i: any) => i.id === data.id);
        if (!existing) return;

        if (
          existing.stepsCompleted?.includes("metadata") &&
          existing.stepsCompleted?.includes("blurhash") &&
          existing.stepsCompleted?.includes("dominant_color")
        ) {
          console.log("Already processed metadata, skipping", data.id);
          return;
        }

        const img = await fetch(data.url);
        if (!img.ok) throw new Error("Image fetch failed");

        const buffer = Buffer.from(await img.arrayBuffer());

        const [metadata, blurhash, dominant_color] = await Promise.all([
          extractMetadata(buffer),
          getBlurHash(buffer),
          getDominantColor(buffer),
        ]);

        const updatedCache = parsed.map((item: any) => {
          if (item.id !== data.id) return item;

          return {
            ...item,
            metadata: {
              others: metadata,
              blurhash,
              dominant_color,
            },
            stepsCompleted: [
              ...new Set([
                ...item.stepsCompleted,
                "metadata",
                "blurhash",
                "dominant_color",
              ]),
            ],
          };
        });

        await cache.hset(
          "picture:upload",
          data.userId,
          JSON.stringify(updatedCache),
        );

        await kafkaProduceMessage(
          "metadata-extraction-complete",
          JSON.stringify({
            id: data.id,
            userId: data.userId,
          }),
        );
      } catch (err: any) {
        console.error("Metadata processing failed", {
          id: data?.id,
          error: err.message,
        });

        throw err;
      }
    },
  });
};

run().catch((err) => {
  console.error("Crashed", err);
  process.exit(1);
});
