import { cache } from "@workspace/lib";
import { prisma } from "@workspace/lib/prisma";

export const getCollections = async () => {
  const cacheKey = "collections";
  const cachedCollections = await cache.get(cacheKey);
  if (cachedCollections) {
    return JSON.parse(cachedCollections);
  }

  const collections = await prisma.collection.findMany({
    where: {
      visibility: "PUBLIC",
    },
    orderBy: {
      updated_at: "desc",
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      items: {
        include: {
          picture: {
            select: {
              src: true,
              id: true,
              title: true,
              user_id: true,
            },
          },
        },
      },
    },
  });

  await cache.set(cacheKey, JSON.stringify(collections), "EX", 60 * 60 * 6);
  return collections;
};

export const getUserCollections = async (userId: string, isOwner: boolean) => {
  const cacheKey = `collections:user:${userId}`;
  const cachedCollections = await cache.get(cacheKey);
  if (cachedCollections && isOwner) {
    return JSON.parse(cachedCollections);
  }

  if (cachedCollections && !isOwner) {
    const parsedData = JSON.parse(cachedCollections);
    return parsedData.filter(
      (collection: any) => collection.visibility === "PUBLIC",
    );
  }

  const collections = await prisma.collection.findMany({
    where: {
      creator_id: userId,
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      items: {
        include: {
          picture: {
            select: {
              src: true,
              id: true,
              title: true,
              user_id: true,
            },
          },
        },
      },
    },
  });

  await cache.set(cacheKey, JSON.stringify(collections), "EX", 60 * 60 * 6);
  return collections;
};

export const getCollectionById = async (id: string, isOwner: boolean) => {
  const cacheKey = `collections:${id}`;
  const cacheItemKey = cacheKey + ":items";

  const cachedCollections = await cache.get(cacheKey);
  if (cachedCollections) {
    const parsedCollection = JSON.parse(cachedCollections);
    if (!isOwner && parsedCollection.visibility === "PRIVATE") {
      return null;
    }
    const cachedItems = await cache.get(cacheItemKey);
    if (cachedItems) {
      const parsedItem = JSON.parse(cachedItems);
      return { ...parsedCollection, items: parsedItem };
    }
  }

  const collection = cachedCollections
    ? JSON.parse(cachedCollections)
    : await prisma.collection.findUnique({
        where: { id },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });

  if (!collection) {
    return null;
  }

  if (!isOwner && collection.visibility === "PRIVATE") {
    return null;
  }

  const items = await prisma.collectionItem.findMany({
    where: {
      collection_id: id,
    },
    include: {
      picture: {
        select: {
          src: true,
          id: true,
          title: true,
          user_id: true,
        },
      },
    },
    omit: {
      collection_id: true,
      pic_id: true,
    },
  });

  await cache.set(cacheKey, JSON.stringify(collection), "EX", 60 * 60 * 6);
  await cache.set(cacheItemKey, JSON.stringify(items), "EX", 60 * 60 * 6);
  return { ...collection, items };
};

export const createCollection = async (data: {
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  creator_id: string;
}) => {
  const update = await prisma.collection.create({ data });

  const cacheKey = `collections:${update.id}`;
  await cache.set(cacheKey, JSON.stringify(update));

  return update;
};

export const updateCollection = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    visibility?: "PUBLIC" | "PRIVATE";
    cover_image?: string;
  },
) => {
  const cacheKey = `collections:${id}`;
  const updated = await prisma.collection.update({ where: { id }, data });

  await cache.set(cacheKey, JSON.stringify(updated));

  return updated;
};

export const addCollectionItems = async (
  data: {
    collection_id: string;
    pic_id: string;
  }[],
) => {
  const cacheKey = `collections:${data[0].collection_id}`;
  const cacheItemKey = cacheKey + ":items";
  const items = await prisma.collectionItem.createMany({
    data,
    skipDuplicates: true,
  });

  await cache.del(cacheItemKey);
  return items;
};

export const removeCollectionItems = async (
  collection_id: string,
  pic_ids: string[],
) => {
  const cacheKey = `collections:${collection_id}`;
  const cacheItemKey = cacheKey + ":items";
  const items = await prisma.collectionItem.deleteMany({
    where: {
      collection_id,
      pic_id: {
        in: pic_ids,
      },
    },
  });

  await cache.del(cacheItemKey);
  return items;
};

export const deleteCollection = async (id: string) => {
  const cacheKey = `collections:${id}`;
  const cacheItemKey = cacheKey + ":items";
  const deleted = await prisma.collection.delete({ where: { id } });

  await cache.del(cacheKey);
  await cache.del(cacheItemKey);

  return deleted;
};
