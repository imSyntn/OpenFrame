import { prisma } from "@workspace/lib/prisma";
import {
  type SrcType,
  type UnderProcessingPictureType,
} from "@workspace/types";

export const bulkWrite = async (items: UnderProcessingPictureType[]) => {
  await prisma.$transaction(async (tx) => {
    await tx.picture.createMany({
      data: items.map((item) => ({
        id: item.id,
        user_id: item.userId as string,
        title: item.title,
        description: item.description,
        alt: item.title,
      })),
      skipDuplicates: true,
    });

    await tx.metadata.createMany({
      data: items.map((item) => ({
        pic_id: item.id,
        others: item.metadata?.others as string,
        blurhash: item.metadata?.blurhash as string,
        dominant_color: item.metadata?.dominant_color as string,
      })),
      skipDuplicates: true,
    });

    const sources = items.flatMap((item) =>
      item.src
        ? item.src.map((s: SrcType) => ({
            pic_id: item.id,
            resolution: s.resolution,
            url: s.url,
            width: s.width,
            height: s.height,
            size: s.size,
          }))
        : [],
    );

    if (sources.length > 0) {
      await tx.src.createMany({
        data: sources,
        skipDuplicates: true,
      });
    }

    const tagNames = [
      ...new Set(items.flatMap((item) => item.tags.map((t) => t.name))),
    ];
    await tx.tag.createMany({
      data: tagNames.map((name) => ({ name })),
      skipDuplicates: true,
    });

    const tags = await tx.tag.findMany({
      where: { name: { in: tagNames } },
    });
    const tagMap = new Map(tags.map((t) => [t.name, t.id]));

    await tx.picTag.createMany({
      data: items.flatMap((item) =>
        item.tags.map((t) => ({
          pic_id: item.id,
          tag_id: tagMap.get(t.name)!,
        })),
      ),
      skipDuplicates: true,
    });
  });
};
