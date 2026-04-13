import { picturesIndex, tagsIndex, usersIndex } from "@workspace/lib/search";

export const searchPictures = async (q: string) => {
  const results = await picturesIndex.search({
    query: q,
    reranking: true,
    limit: 50,
  });
  return results;
};

export const searchUsers = async (q: string) => {
  const results = await usersIndex.search({
    query: q,
    reranking: true,
    limit: 10,
  });

  return results;
};

export const searchTags = async (q: string) => {
  const results = await tagsIndex.search({
    query: q,
    reranking: true,
    limit: 10,
  });

  return results;
};
