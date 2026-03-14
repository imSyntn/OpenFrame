import { prisma, s3 } from "@/lib";
import { PIC_PER_PAGE } from "@workspace/constants";
import { userCacheStore } from "@/lib";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getUserPictures = async (id: string, page: number) => {
  const cacheKey = `${id}:${page}`;

  const cached = await userCacheStore.hget("user:pictures", cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const pictures = await prisma.picture.findMany({
    where: {
      user_id: id,
    },
    include: {
      src: true,
      metadata: true,
    },
    skip: (page - 1) * PIC_PER_PAGE,
    take: PIC_PER_PAGE,
  });

  await userCacheStore.hset(
    "user:pictures",
    cacheKey,
    JSON.stringify(pictures),
  );

  return pictures;
};

export const getPictureUploadUrl = async (
  type: string,
  size: number,
  isAvatar: boolean,
) => {
  const id = nanoid();
  const Key = isAvatar
    ? `avatars/${id}.${type.split("/")[1]}`
    : `pictures/${id}.${type.split("/")[1]}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    ContentType: type,
    ContentLength: size,
    CacheControl: "public, max-age=31536000, immutable",
    ACL: "public-read",
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.${process.env.AWS_ENDPOINT_URL_S3?.split("https://")[1]}/${Key}`;

  return { uploadUrl, fileUrl };
};

export const getPictureTags = async () => {
  const availableInCache = await userCacheStore.hget("pictures", "tags");

  if (availableInCache) {
    return JSON.parse(availableInCache);
  }

  const tags = await prisma.tag.findMany({});

  await userCacheStore.hset(
    "pictures",
    "tags",
    JSON.stringify(tags),
    "EX",
    60 * 60 * 24,
  );

  return tags;
};

export const createPicture = async (
  title: string,
  description: string,
  tags: {
    id: number;
    name: string;
  }[],
  url: string,
  userId: string,
) => {
  const getPreviousUploads = await userCacheStore.hget(
    "picture:create",
    userId,
  );
  const userUploadedPictures = JSON.parse(getPreviousUploads || "[]");

  const addNew = [
    ...userUploadedPictures,
    {
      id: nanoid(),
      title,
      description,
      tags,
      url,
      processing: "ongoing",
      createdAt: new Date().toISOString(),
    },
  ];

  console.log({
    id: nanoid(),
    title,
    description,
    tags,
    url,
    processing: true,
  });

  await userCacheStore.hset("picture:create", userId, JSON.stringify(addNew));
};

export const getAllPictureStatus = async (userId: string) => {
  const availableInCache = await userCacheStore.hget("picture:create", userId);

  return JSON.parse(availableInCache || "[]");
};

export const getPictureStatus = async (userId: string, pictureID: string) => {
  const availableInCache = await userCacheStore.hget("picture:create", userId);

  const data = JSON.parse(availableInCache || "[]");

  const picture = data.find((item: any) => item.id === pictureID) || {};

  return picture;
};
