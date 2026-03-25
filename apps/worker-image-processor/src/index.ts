import "@workspace/lib/env";
import { kafka, kafkaProduceMessage } from "@workspace/lib/kafka";
import { cache } from "@workspace/lib";
import { resizeImage } from "./processImage";
import { uploadVariants } from "./lib/upload";

const consumer = kafka.consumer({ groupId: "worker-processor" });

const run = async () => {
  console.log(process.env.AWS_ENDPOINT_URL_S3);
  await consumer.connect();
  await consumer.subscribe({ topic: "picture-upload", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value?.toString() || "{}");
      console.log(data);

      const { original, variants } = await resizeImage(data.url);

      console.log(original, variants);

      const variantsUploaded = await uploadVariants(data.id, variants);

      console.log("variantsUploaded", variantsUploaded);

      const availableInCache = await cache.hget("picture:upload", data.userId);
      const parsed = JSON.parse(availableInCache || "[]");

      const updatedCache = parsed.map((item: any) => {
        if (item.id === data.id) {
          const updated = {
            ...item,
            stepsCompleted: [...item.stepsCompleted, "variants"],
            src: [original, ...variantsUploaded],
          };
          return updated;
        } else {
          return item;
        }
      });

      await cache.hset(
        "picture:upload",
        data.userId,
        JSON.stringify(updatedCache),
      );

      await kafkaProduceMessage(
        "processing-complete",
        JSON.stringify({ id: data.id, userId: data.userId }),
      );
    },
  });
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
