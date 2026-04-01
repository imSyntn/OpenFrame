import { prisma } from "@workspace/lib/prisma";
import type { EngagementEventType } from "@workspace/types";

function aggregate(
  messages: EngagementEventType[],
  key: "view" | "download" | "like",
) {
  const map = new Map<string, number>();

  for (const msg of messages) {
    if (msg.type === key) {
      map.set(msg.pictureID, (map.get(msg.pictureID) || 0) + 1);
    }
  }

  return Array.from(map.entries());
}

async function runBulk(
  tx: any,
  entries: [string, number][],
  column: "views" | "downloads" | "likes",
) {
  if (entries.length === 0) return;

  const valuesSql = entries
    .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
    .join(", ");

  const params = entries.flatMap(([picId, count]) => [picId, count]);

  await tx.$executeRawUnsafe(
    `
  INSERT INTO "Engagement" ("pic_id", "${column}")
  VALUES ${valuesSql}
  ON CONFLICT ("pic_id")
  DO UPDATE SET "${column}" = "Engagement"."${column}" + EXCLUDED."${column}";
  `,
    ...params,
  );
}

export const bulkWrite = async (
  likeMessages: EngagementEventType[],
  viewMessages: EngagementEventType[],
  downloadMessages: EngagementEventType[],
) => {
  await prisma.$transaction(async (tx) => {
    const viewEntries = aggregate(viewMessages, "view");
    const downloadEntries = aggregate(downloadMessages, "download");
    const likeEntries = aggregate(likeMessages, "like");

    await runBulk(tx, viewEntries, "views");
    await runBulk(tx, downloadEntries, "downloads");
    await runBulk(tx, likeEntries, "likes");
  });
};
