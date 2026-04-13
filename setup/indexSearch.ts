import { prisma } from "@workspace/lib/prisma";
import { picturesIndex, tagsIndex, usersIndex } from "@workspace/lib/search";

export async function SetupIndexing() {
  console.log("Indexing pictures...");

  const pictures = await prisma.picture.findMany({
    include: {
      src: true,
    },
    take: 100,
    orderBy: {
      created_at: "desc",
    },
  });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      avatar: true,
    },
    take: 100,
    orderBy: {
      joined_at: "desc",
    },
  });

  const tags = await prisma.tag.findMany({
    take: 100,
    orderBy: {
      id: "desc",
    },
  });

  await picturesIndex.upsert(
    pictures.map((p) => ({
      id: p.id,
      content: {
        title: p.title,
        description: p.description?.slice(0, 100) || "",
        src:
          p.src?.find((s) => s.resolution === "SMALL")?.url ||
          p.src?.find((s) => s.resolution === "ORIGINAL")?.url ||
          "",
      },
      metadata: {
        createdAt: p.created_at,
      },
    })),
  );

  await usersIndex.upsert(
    users.map((u) => ({
      id: u.id,
      content: {
        name: u.name,
        avatar: u.avatar,
      },
    })),
  );
  await tagsIndex.upsert(
    tags.map((t) => ({ id: t.id.toString(), content: { name: t.name } })),
  );

  console.log("Search index setup complete");
}
