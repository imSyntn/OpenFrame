import { api } from "../axios";
import { Collection } from "@workspace/types";

export const getCollections = async (): Promise<{
  data: Collection[];
}> => {
  const res = await api.get(`/api/collection`);
  return res.data;
};

export const getUserCollections = async (
  userId: string,
): Promise<{
  data: Collection[];
}> => {
  const res = await api.get(`/api/collection/user/${userId}`);
  return res.data;
};

export const getCollectionById = async (
  id: string,
): Promise<{
  data: Collection;
}> => {
  const res = await api.get(`/api/collection/${id}`);
  return res.data;
};

export const createCollection = async (data: {
  title: string;
  description: string;
  visibility: string;
}) => {
  const res = await api.post(`/api/collection`, data);
  return res.data;
};

export const updateCollection = async (
  id: string,
  data: {
    title: string;
    description: string;
    visibility: string;
  },
) => {
  const res = await api.patch(`/api/collection/${id}`, data);
  return res.data;
};

export const deleteCollection = async (id: string) => {
  const res = await api.delete(`/api/collection/${id}`);
  return res.data;
};

export const addCollectionItems = async (id: string, items: string[]) => {
  const res = await api.post(`/api/collection/${id}/items`, { items });
  return res.data;
};

export const removeCollectionItems = async (id: string, items: string[]) => {
  const res = await api.delete(`/api/collection/${id}/items`, {
    data: { items },
  });
  return res.data;
};
