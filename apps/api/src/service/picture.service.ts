import { prisma } from "@workspace/lib/prisma";
import { cache } from "@workspace/lib/redis";
import { kafkaProduceMessage } from "@workspace/lib/kafka";
import { PIC_PER_PAGE, EXPLORE_PIC_PER_PAGE } from "@workspace/constants";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/s3client";
import { UnderProcessingPictureType } from "@workspace/types";

export const getUserPictures = async (id: string, lastId: string | null) => {
  const cacheKey = `user:pictures:${id}:${lastId || "-1"}`;

  const cached = await cache.get(cacheKey);
  if (cached) {
    const pictures = JSON.parse(cached);
    const nextCursor = pictures[pictures.length - 1]?.id || null;
    return { pictures, nextCursor };
  }

  const pictures = await prisma.picture.findMany({
    where: { user_id: id },
    take: PIC_PER_PAGE,
    cursor: lastId ? { id: lastId } : undefined,
    skip: lastId ? 1 : 0,
    orderBy: { created_at: "desc" },
    include: {
      src: true,
      metadata: true,
      tags: {
        include: {
          tag: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      engagement: true,
    },
  });

  const nextCursor = pictures[pictures.length - 1]?.id || null;

  await cache.set(cacheKey, JSON.stringify(pictures), "EX", 60 * 60 * 2);

  return { pictures, nextCursor };
};

export const getUserLikedPictures = async (
  id: string,
  lastId: string | null,
) => {
  const cacheKey = `user:liked-pictures:${id}:${lastId || "-1"}`;

  const cached = await cache.get(cacheKey);
  if (cached) {
    const pictures = JSON.parse(cached);
    const nextCursor = pictures[pictures.length - 1]?.id || null;
    return { pictures, nextCursor };
  }

  const pictures = await prisma.like.findMany({
    where: { user_id: id },
    take: PIC_PER_PAGE,
    cursor: lastId
      ? { user_id_pic_id: { user_id: id, pic_id: lastId } }
      : undefined,
    skip: lastId ? 1 : 0,
    orderBy: { pic_id: "desc" },
    include: {
      picture: {
        include: {
          src: true,
          metadata: true,
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
          engagement: true,
        },
      },
    },
  });

  const nextCursor = pictures[pictures.length - 1]?.pic_id || null;

  const flattenData = pictures.map((pic) => pic.picture);

  await cache.set(cacheKey, JSON.stringify(flattenData), "EX", 60 * 60 * 2);

  return { pictures: flattenData, nextCursor };
};

export const getPictureById = async (id: string) => {
  const cached = await cache.get(`picture:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const picture = await prisma.picture.findUnique({
    where: { id },
    include: {
      src: true,
      metadata: true,
      tags: {
        include: {
          tag: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      engagement: true,
    },
  });

  await cache.set(`picture:${id}`, JSON.stringify(picture), "EX", 60 * 60 * 2);

  return picture;
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
  const fileUrl = `${process.env.CDN_URL}/${Key}`;

  return { uploadUrl, fileUrl, id };
};

export const getPictureTags = async () => {
  const availableInCache = await cache.get("pictures:tags");

  if (availableInCache) {
    return JSON.parse(availableInCache);
  }

  const tags = await prisma.tag.findMany({
    include: {
      pictures: {
        take: 1,
        select: {
          picture: {
            select: {
              src: true,
            },
          },
        },
      },
    },
  });

  const formattedTags = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    url:
      tag.pictures[0]?.picture.src.sort((a, b) => a.size - b.size)[0]?.url ||
      "https://res.cloudinary.com/dqn1hcl8c/image/upload/v1774718348/7b334c62-d5bc-4fa4-9eaa-db2232c57fd6_kgtvdp.jpg",
  }));

  await cache.set("tags", JSON.stringify(formattedTags), "EX", 60 * 60 * 24);

  return formattedTags;
};

export const getExplorePictures = async (
  tag: string,
  lastId: string | null,
) => {
  let tagID: number = -1;
  if (tag) {
    tagID = Number(tag);
  }
  const cacheKey = `explore:pictures:${tagID}:${lastId || "-1"}`;

  const cached = await cache.get(cacheKey);
  if (cached) {
    const pictures = JSON.parse(cached);
    const nextCursor = pictures[pictures.length - 1]?.id || null;
    return { pictures, nextCursor };
  }

  const pictures = await prisma.picture.findMany({
    where: {
      tags: {
        some: tagID !== -1 ? { tag_id: tagID } : undefined,
      },
    },
    take: EXPLORE_PIC_PER_PAGE,
    cursor: lastId ? { id: lastId } : undefined,
    skip: lastId ? 1 : 0,
    orderBy: { created_at: "desc" },
    include: {
      src: true,
      metadata: true,
      tags: {
        include: {
          tag: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      engagement: true,
    },
  });

  const nextCursor = pictures[pictures.length - 1]?.id || null;

  await cache.set(cacheKey, JSON.stringify(pictures), "EX", 60 * 60 * 24);

  return { pictures, nextCursor };
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
  pictureId: string,
) => {
  const newPicture: UnderProcessingPictureType = {
    id: pictureId,
    title,
    description,
    tags,
    url,
    processing: "ongoing",
    stepsCompleted: [],
    created_at: new Date().toISOString(),
    userId,
  };

  await cache.hset(
    `picture:upload:${userId}`,
    pictureId,
    JSON.stringify(newPicture),
  );
  await cache.expire(`picture:upload:${userId}`, 60 * 60 * 24);
  await kafkaProduceMessage("picture-upload", JSON.stringify(newPicture));
};

export const getAllPictureStatus = async (userId: string) => {
  const data = await cache.hgetall(`picture:upload:${userId}`);

  return Object.values(data).map((item) => JSON.parse(item));
};

export const getPictureStatus = async (userId: string, pictureID: string) => {
  const data = await cache.hget(`picture:upload:${userId}`, pictureID);

  return JSON.parse(data || "{}");
};

export const incrementViewCount = async (pictureID: string, userID: string) => {
  await kafkaProduceMessage(
    "engagement-events",
    JSON.stringify({
      type: "view",
      pictureID,
      userID,
    }),
  );
};

export const incrementDownloadCount = async (
  pictureID: string,
  userID: string,
) => {
  await kafkaProduceMessage(
    "engagement-events",
    JSON.stringify({
      type: "download",
      pictureID,
      userID,
    }),
  );
};

export const incrementLikeCount = async (pictureID: string, userID: string) => {
  await kafkaProduceMessage(
    "engagement-events",
    JSON.stringify({
      type: "like",
      pictureID,
      userID,
    }),
  );
};
