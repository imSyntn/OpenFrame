import { prisma } from "@workspace/lib/prisma";
import { cache } from "@workspace/lib/redis";
import { kafkaProduceMessage } from "@workspace/lib/kafka";
import { PIC_PER_PAGE, EXPLORE_PIC_PER_PAGE } from "@workspace/constants";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/s3client";
import { UnderProcessingPictureType } from "@workspace/types";

export const getUserPictures = async (
  id: string,
  page: number,
  lastId: string | null,
) => {
  const cacheKey = `${id}:${page}:${lastId}`;

  const cached = await cache.get(`user:pictures:${cacheKey}`);
  if (cached) {
    return JSON.parse(cached);
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

  await cache.set(
    `user:pictures:${cacheKey}`,
    JSON.stringify({ pictures, nextCursor }),
    "EX",
    60 * 60 * 2,
  );

  return { pictures, nextCursor };
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

  const exploreTag = {
    id: "explore",
    name: "explore",
    url: "https://res.cloudinary.com/dqn1hcl8c/image/upload/v1774718348/7b334c62-d5bc-4fa4-9eaa-db2232c57fd6_kgtvdp.jpg",
  };

  const withDefault = [exploreTag, ...formattedTags];

  await cache.set(
    "pictures:tags",
    JSON.stringify(withDefault),
    "EX",
    60 * 60 * 24,
  );

  return withDefault;
};

export const getExplorePictures = async (lastId: string | null) => {
  const cacheKey = `${lastId}`;

  const cached = await cache.get(`explore:pictures:${cacheKey}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const pictures = await prisma.picture.findMany({
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

  await cache.set(
    `explore:pictures:${cacheKey}`,
    JSON.stringify({ pictures, nextCursor }),
    "EX",
    60 * 60 * 24,
  );

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

export const incrementViewCount = async (pictureID: string) => {
  await prisma.engagement.upsert({
    where: {
      pic_id: pictureID,
    },
    update: {
      views: {
        increment: 1,
      },
    },
    create: {
      pic_id: pictureID,
      views: 1,
    },
  });
};
export const incrementDownloadCount = async (pictureID: string) => {
  await prisma.engagement.upsert({
    where: {
      pic_id: pictureID,
    },
    update: {
      downloads: {
        increment: 1,
      },
    },
    create: {
      pic_id: pictureID,
      downloads: 1,
    },
  });
};

// export const incrementLikeCount = async (pictureID: string) => {
//   await prisma.engagement.upsert({
//     where: {
//       pic_id: pictureID,
//     },
//     update: {
//       views: {
//         increment: 1,
//       },
//     },
//     create: {
//       pic_id: pictureID,
//       views: 1,
//     },
//   });
// };
