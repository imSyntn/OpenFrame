import { prisma } from "@workspace/lib/prisma";
import { picturesIndex, tagsIndex, usersIndex } from "@workspace/lib/search";

const returnChunks = <T>(data: T[], chunkSize: number) => {
  const chunks: T[][] = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
};

export async function SetupIndexing() {
  console.log("Indexing pictures...");

  const pictures = await prisma.picture.findMany({
    include: {
      src: true,
      metadata: {
        select: {
          blurhash: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const pictureMap = pictures.map((item) => {
    const small = item.src?.find((s) => s.resolution === "SMALL");
    const original = item.src?.find((s) => s.resolution === "ORIGINAL");

    return {
      id: item.id,
      content: {
        title: item.title,
        description: item.description?.slice(0, 100) || "",
        src: small?.url || original?.url || "",
        height: original?.height || 0,
        width: original?.width || 0,
        blurhash: item.metadata?.blurhash || "",
        user: {
          id: item.user?.id || "",
          name: item.user?.name || "",
          avatar: item.user?.avatar || "",
        },
      },
      metadata: {
        createdAt: item.created_at,
      },
    };
  });

  const pictureChunks = returnChunks(pictureMap, 100);

  await Promise.all(pictureChunks.map((chunk) => picturesIndex.upsert(chunk)));

  console.log("Indexing users...");

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      avatar: true,
    },
    orderBy: {
      joined_at: "desc",
    },
  });

  const usersMap = users.map((u) => ({
    id: u.id,
    content: {
      name: u.name,
      avatar: u.avatar,
    },
  }));

  const userChunks = returnChunks(usersMap, 100);

  await Promise.all(userChunks.map((chunk) => usersIndex.upsert(chunk)));

  console.log("Indexing tags...");

  const tags = await prisma.tag.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const tagsMap = tags.map((t) => ({
    id: t.id.toString(),
    content: { name: t.name },
  }));

  const tagChunks = returnChunks(tagsMap, 100);

  await Promise.all(tagChunks.map((chunk) => tagsIndex.upsert(chunk)));

  console.log("Search index setup complete");
}
