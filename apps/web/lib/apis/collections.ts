import { api } from "../axios";
import { Collection } from "@workspace/types";

export const getCollections = async (
  nextCursor?: string,
): Promise<{
  data: Collection[];
  nextCursor?: string;
}> => {
  const res = await api.get(`/collection`, {
    params: {
      nextCursor,
    },
  });
  return res.data;
};

export const getUserCollections = async (
  userId: string,
): Promise<{
  data: Collection[];
}> => {
  const res = await api.get(`/collection/user/${userId}`);
  return res.data;
};

export const getCollectionById = async (
  id: string,
): Promise<{
  data: Collection;
}> => {
  const res = await api.get(`/collection/${id}`);
  return res.data;
};

export const createCollection = async (data: {
  title: string;
  description?: string;
  visibility: string;
}): Promise<{
  data: Collection;
}> => {
  const res = await api.post(`/collection`, data);
  return res.data;
};

export const updateCollection = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    visibility?: string;
  },
) => {
  const res = await api.patch(`/collection/${id}`, data);
  return res.data;
};

export const deleteCollection = async (id: string) => {
  const res = await api.delete(`/collection/${id}`);
  return res.data;
};

export const addCollectionItems = async (id: string, items: string[]) => {
  const res = await api.post(`/collection/${id}/items`, {
    items,
  });
  return res.data;
};

export const removeCollectionItems = async (id: string, items: string[]) => {
  const res = await api.delete(`/collection/${id}/items`, {
    data: { items },
  });
  return res.data;
};
