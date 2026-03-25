import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
console.log(
  process.env.AWS_REGION,
  process.env.AWS_BUCKET_NAME,
  process.env.AWS_ENDPOINT_URL_S3,
);
if (
  !process.env.AWS_REGION ||
  !process.env.AWS_BUCKET_NAME ||
  !process.env.AWS_ENDPOINT_URL_S3
) {
  throw new Error("Missing AWS credentials");
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: false,
});

const uploadImage = async (buffer: Buffer, key: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: "image/jpeg",
    CacheControl: "public, max-age=31536000, immutable",
    ACL: "public-read",
  });

  await s3.send(command);
  return `https://${process.env.AWS_BUCKET_NAME}.${process.env.AWS_ENDPOINT_URL_S3?.split("https://")[1]}/${key}`;
};

export const uploadVariants = async (imageId: string, variants: any[]) => {
  return Promise.all(
    variants.map(async (v) => {
      const key = `pictures/${imageId}_${v.resolution.toLowerCase()}.jpg`;
      const url = await uploadImage(v.buffer, key);

      return {
        resolution: v.resolution,
        url,
        width: v.width,
        height: v.height,
        size: v.size,
      };
    }),
  );
};
