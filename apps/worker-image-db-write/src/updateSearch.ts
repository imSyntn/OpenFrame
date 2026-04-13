import { picturesIndex, tagsIndex } from "@workspace/lib";
import type {
  PictureSearch,
  TagSearch,
  UnderProcessingPictureType,
} from "@workspace/types";

export const updatePicturesSearchData = async (
  parsedMessages: UnderProcessingPictureType[],
) => {
  const pictureDataChunks: PictureSearch[][] = [];
  let index = 0;
  for (let i = 0; i < parsedMessages.length; i++) {
    if (pictureDataChunks[index]?.length === 100) {
      index++;
      pictureDataChunks[index] = [];
    }
    const id = parsedMessages[i]?.id?.toString() || "";
    if (!id) continue;
    pictureDataChunks[index]?.push({
      id,
      content: {
        title: parsedMessages[i]?.title || "",
        description: parsedMessages[i]?.description?.slice(0, 100) || "",
        src:
          parsedMessages[i]?.src?.find((s) => s.resolution === "SMALL")?.url ||
          parsedMessages[i]?.src?.find((s) => s.resolution === "ORIGINAL")
            ?.url ||
          "",
      },
      metadata: {
        createdAt: parsedMessages[i]?.created_at || "",
      },
    });
  }

  for (const chunk of pictureDataChunks) {
    await picturesIndex.upsert(chunk);
  }
};

export const updateTagsSearchData = async (
  parsedMessages: UnderProcessingPictureType[],
) => {
  const tags = parsedMessages.flatMap((message) =>
    message.tags.map((tag) => ({
      id: tag.id,
      content: {
        name: tag.name,
      },
    })),
  );

  const tagDataChunks: TagSearch[][] = [];
  let tagIndex = 0;
  for (let i = 0; i < tags.length; i++) {
    if (tagDataChunks[tagIndex]?.length === 100) {
      tagIndex++;
      tagDataChunks[tagIndex] = [];
    }
    const id = tags[i]?.id?.toString() || "";
    if (!id) continue;
    tagDataChunks[tagIndex]?.push({
      id,
      content: {
        name: tags[i]?.content?.name || "",
      },
    });
  }

  for (const chunk of tagDataChunks) {
    await tagsIndex.upsert(chunk);
  }
};
