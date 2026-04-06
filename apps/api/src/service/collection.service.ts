import { PIC_PER_PAGE } from "@workspace/constants";
import { cache, Collection, logger } from "@workspace/lib";
import { prisma } from "@workspace/lib/prisma";

export const getCollections = async (nextCursor: string) => {
  const cacheKey = `collections:${nextCursor || "-1"}`;
  const cachedCollections = await cache.get(cacheKey);
  if (cachedCollections) {
    const collections = JSON.parse(cachedCollections);
    const lastId = collections[collections.length - 1].id;
    return { collections, nextCursor: lastId };
  }

  const collections = await prisma.collection.findMany({
    where: {
      visibility: "PUBLIC",
    },
    orderBy: {
      updated_at: "desc",
    },
    take: PIC_PER_PAGE,
    cursor: nextCursor ? { id: nextCursor } : undefined,
    skip: nextCursor ? 1 : 0,
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

  const lastId = collections[collections.length - 1]?.id || null;

  await cache.set(cacheKey, JSON.stringify(collections), "EX", 60 * 60 * 6);
  return { collections, nextCursor: lastId };
};

export const getUserCollections = async (userId: string, isOwner: boolean) => {
  const cacheKey = `collections:user:${userId}`;
  const cacheItemsKey = `${cacheKey}:items`;

  let cachedCollections = await cache.get(cacheKey);
  let cachedItems = await cache.get(cacheItemsKey);

  if (cachedCollections && cachedItems && isOwner) {
    cachedCollections = JSON.parse(cachedCollections).map((collection: any) => {
      return {
        ...collection,
        items: JSON.parse(cachedItems).filter(
          (item: any) => item.collection_id === collection.id,
        ),
      };
    });
    return cachedCollections;
  }

  if (cachedCollections && cachedItems && !isOwner) {
    const publicCollections = JSON.parse(cachedCollections).filter(
      (collection: Collection) => collection.visibility === "PUBLIC",
    );

    const collections = publicCollections.map((collection: any) => {
      return {
        ...collection,
        items: JSON.parse(cachedItems).filter(
          (item: any) =>
            item.collection_id === collection.id &&
            collection.visibility === "PUBLIC",
        ),
      };
    });
    return collections;
  }

  let collections = cachedCollections
    ? JSON.parse(cachedCollections)
    : await prisma.collection.findMany({
        where: { creator_id: userId },
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

  if (!collections) {
    return [];
  }

  await cache.set(cacheKey, JSON.stringify(collections), "EX", 60 * 60 * 6);

  // if (!isOwner) {
  //   collections = collections.filter(
  //     (collection: any) => collection.visibility === "PUBLIC",
  //   );
  // }

  const items = cachedItems
    ? JSON.parse(cachedItems)
    : await prisma.collectionItem.findMany({
        where: {
          collection_id: {
            in: collections.map((collection: any) => collection.id),
          },
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
      });

  collections = collections.map((collection: any) => ({
    ...collection,
    items: items.filter((item: any) => item.collection_id === collection.id),
  }));

  if (!isOwner) {
    collections = collections.filter(
      (collection: any) => collection.visibility === "PUBLIC",
    );
  }

  await cache.set(cacheItemsKey, JSON.stringify(items), "EX", 60 * 60 * 6);
  return collections;
};

export const getCollectionById = async (
  id: string,
  isOwner: boolean = true,
) => {
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
  const update = await prisma.collection.create({
    data,
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
  const cacheKeyUser = `collections:user:${data.creator_id}`;
  const cacheKeyCollection = `collections:${update.id}`;

  const cachedCollections = await cache.get(cacheKeyUser);

  const parsedCollections = cachedCollections
    ? JSON.parse(cachedCollections)
    : [];
  parsedCollections.push(update);
  await cache.set(
    cacheKeyUser,
    JSON.stringify(parsedCollections),
    "EX",
    60 * 60 * 6,
  );

  await cache.set(
    cacheKeyCollection,
    JSON.stringify(update),
    "EX",
    60 * 60 * 6,
  );

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
  const updated = await prisma.collection.update({
    where: { id },
    data,
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

  const cacheKeyCollection = `collections:${id}`;
  const cacheKeyUser = `collections:user:${updated.creator_id}`;

  await cache.set(
    cacheKeyCollection,
    JSON.stringify(updated),
    "EX",
    60 * 60 * 6,
  );

  const cachedCollections = await cache.get(cacheKeyUser);

  if (cachedCollections) {
    const parsedCollections = JSON.parse(cachedCollections);
    const updatedCollections = parsedCollections.map((collection: any) => {
      if (collection.id === id) {
        return updated;
      }
      return collection;
    });
    await cache.set(
      cacheKeyUser,
      JSON.stringify(updatedCollections),
      "EX",
      60 * 60 * 6,
    );
  }

  return updated;
};

export const addCollectionItems = async (
  user_id: string,
  data: {
    collection_id: string;
    pic_id: string;
  }[],
) => {
  const cacheKey = `collections:user:${user_id}:items`;
  const items = await prisma.collectionItem.createMany({
    data,
    skipDuplicates: true,
  });

  await cache.del(cacheKey);
  return items;
};

export const removeCollectionItems = async (
  collection_id: string,
  pic_ids: string[],
  user_id: string,
) => {
  const cacheKey = `collections:user:${user_id}:items`;

  const items = await prisma.collectionItem.deleteMany({
    where: {
      collection_id,
      pic_id: {
        in: pic_ids,
      },
    },
  });

  const cachedItems = await cache.get(cacheKey);
  if (cachedItems) {
    const parsedItems = JSON.parse(cachedItems);
    const updatedItems = parsedItems.filter(
      (item: any) => !pic_ids.includes(item.pic_id),
    );
    await cache.set(cacheKey, JSON.stringify(updatedItems), "EX", 60 * 60 * 6);
  }
  return items;
};

export const deleteCollection = async (id: string, user_id: string) => {
  const cacheKey = `collections:${id}`;
  const cacheItemKey = cacheKey + ":items";
  const deleted = await prisma.collection.delete({ where: { id } });

  const userCachedCollectionKey = `collections:user:${user_id}`;
  let userCachedCollection = await cache.get(userCachedCollectionKey);

  if (userCachedCollection) {
    userCachedCollection = JSON.parse(userCachedCollection).filter(
      (collection: Collection) => collection.id != id,
    );
  }

  const pipeline = cache.pipeline();

  pipeline.del(cacheKey);
  pipeline.del(cacheItemKey);
  if (userCachedCollection) {
    pipeline.set(
      userCachedCollectionKey,
      JSON.stringify(userCachedCollection),
      "EX",
      60 * 60 * 6,
    );
  }

  await pipeline.exec();

  return deleted;
};
