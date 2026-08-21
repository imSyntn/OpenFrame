import { PictureType } from "@/@types";
import { api } from "../axios";
import { UnderProcessingPictureType } from "@workspace/types";

export const getUserPictures = async (
  id: string,
  nextCursor: string,
): Promise<{ data: PictureType[]; nextCursor?: string }> => {
  const res = await api.get(`/picture/user/${id}`, {
    params: { nextCursor },
  });
  return res.data;
};

export const getUserLikedPictures = async (
  userId: string,
  nextCursor?: string,
): Promise<{ data: PictureType[]; nextCursor?: string }> => {
  const res = await api.get(`/picture/user/liked/${userId}`, {
    params: { nextCursor },
  });
  return res.data;
};

export const getPictureUploadUrl = async (
  type: string,
  size: number,
  isAvatar?: boolean,
) => {
  const res = await api.post("/picture/upload-url", {
    type,
    size,
    isAvatar,
  });
  return res.data.data;
};

export const getPictureTags = async () => {
  const res = await api.get("/picture/tags");
  return res.data.data;
};

export const getExplorePictures = async (
  tag?: string,
  nextCursor?: string,
): Promise<{ data: PictureType[]; nextCursor?: string }> => {
  const res = await api.get("/picture/explore", {
    params: { tag, nextCursor },
  });
  return res.data;
};

export const createPictureUpload = async (payload: {
  title: string;
  description?: string;
  tags: { id: number; name: string }[];
  url: string;
  pictureId: string;
  license: string;
}) => {
  const res = await api.post("/picture/create", payload);
  return res.data.message;
};

export const getAllUploadsStatus = async (): Promise<
  UnderProcessingPictureType[]
> => {
  const res = await api.get("/picture/status");
  return res.data.data;
};

export const getPictureStatus = async (pictureID: string) => {
  const res = await api.get(`/picture/status/${pictureID}`);
  return res.data.data;
};

export const incrementViewCount = async ({
  id,
  ownerId,
}: {
  id: string;
  ownerId: string;
}): Promise<{ message: string }> => {
  const res = await api.post(`/picture/view/${id}`, {
    ownerId,
  });
  return res.data;
};

export const incrementDownloadCount = async ({
  id,
  ownerId,
}: {
  id: string;
  ownerId: string;
}): Promise<{ message: string }> => {
  const res = await api.post(`/picture/download/${id}`, {
    ownerId,
  });
  return res.data;
};

export const incrementLikeCount = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await api.post(`/picture/like/${id}`);
  return res.data;
};

export const getPictureById = async (
  id: string,
): Promise<{ data: PictureType }> => {
  const res = await api.get(`/picture/${id}`);
  return res.data;
};

export const deletePicture = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await api.delete(`/picture/${id}`);
  return res.data.message;
};
