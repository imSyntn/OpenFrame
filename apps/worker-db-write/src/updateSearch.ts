import { picturesIndex, tagsIndex } from "@workspace/lib";
import type { UnderProcessingPictureType } from "@workspace/types";

const returnChunks = <T>(data: T[], chunkSize: number) => {
  const chunks: T[][] = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
};

export const updatePicturesSearchData = async (
  parsedMessages: UnderProcessingPictureType[],
) => {
  const pictureMap = parsedMessages.map((item) => {
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
      },
      metadata: {
        createdAt: item.created_at,
      },
    };
  });

  const pictureChunks = returnChunks(pictureMap, 100);

  await Promise.all(pictureChunks.map((chunk) => picturesIndex.upsert(chunk)));
};

export const updateTagsSearchData = async (
  parsedMessages: UnderProcessingPictureType[],
) => {
  const tags = parsedMessages.flatMap((message) =>
    message.tags.map((tag) => ({
      id: tag.id.toString(),
      content: {
        name: tag.name,
      },
    })),
  );

  const tagChunks = returnChunks(tags, 100);

  await Promise.all(tagChunks.map((chunk) => tagsIndex.upsert(chunk)));
};
