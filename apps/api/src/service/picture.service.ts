import { prisma } from "@/db";
import { PIC_PER_PAGE } from "@workspace/constants";
import { userCacheStore } from "@/db";

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
