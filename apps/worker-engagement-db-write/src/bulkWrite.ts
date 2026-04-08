import { logger } from "@workspace/lib/logger";
import { prisma } from "@workspace/lib/prisma";
import type { EngagementEventType } from "@workspace/types";

function aggregateWithPictureID(
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

function aggregateWithUserID(
  messages: EngagementEventType[],
  key: "like" | "download",
) {
  const map = new Map<string, number>();

  for (const msg of messages) {
    if (msg.type === key) {
      map.set(msg.userID, (map.get(msg.userID) || 0) + 1);
    }
  }

  return Array.from(map.entries());
}

async function runBulk(
  tx: any,
  entries: [string, number][],
  column: "views" | "downloads" | "likes",
  metricsEntries?: [string, number][],
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

  if (metricsEntries && metricsEntries.length > 0) {
    const col = column == "downloads" ? "total_downloads" : "total_likes";
    const valuesSql = metricsEntries
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(", ");

    const params = metricsEntries.flatMap(([userId, count]) => [userId, count]);
    await tx.$executeRawUnsafe(
      `
        INSERT INTO "Metrics" ("user_id", "${col}")
        VALUES ${valuesSql}
        ON CONFLICT ("user_id")
        DO UPDATE SET "${col}" = "Metrics"."${col}" + EXCLUDED."${col}";
      `,
      ...params,
    );
  }
}

export const bulkWrite = async (
  likeMessages: EngagementEventType[],
  viewMessages: EngagementEventType[],
  downloadMessages: EngagementEventType[],
) => {
  await prisma.$transaction(async (tx) => {
    const viewEntries = aggregateWithPictureID(viewMessages, "view");
    const downloadEntries = aggregateWithPictureID(
      downloadMessages,
      "download",
    );
    const likeEntries = aggregateWithPictureID(likeMessages, "like");

    const likeEntriesForMetrics = aggregateWithUserID(likeMessages, "like");
    const downloadEntriesForMetrics = aggregateWithUserID(
      downloadMessages,
      "download",
    );

    await runBulk(tx, viewEntries, "views");
    await runBulk(tx, downloadEntries, "downloads", downloadEntriesForMetrics);
    await runBulk(tx, likeEntries, "likes", likeEntriesForMetrics);
  });
};
