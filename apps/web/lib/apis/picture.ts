import { PictureType } from "@/@types";
import { api } from "../axios";
import { UnderProcessingPictureType } from "@workspace/types";

export const getUserPictures = async (
  id: string,
  nextCursor: string,
): Promise<{ data: PictureType[]; nextCursor?: string }> => {
  const res = await api.get(`/api/picture/user/${id}`, {
    params: { nextCursor },
  });
  return res.data;
};

export const getPictureUploadUrl = async (
  type: string,
  size: number,
  isAvatar?: boolean,
) => {
  const res = await api.post("/api/picture/upload-url", {
    type,
    size,
    isAvatar,
  });
  return res.data.data;
};

export const getPictureTags = async () => {
  const res = await api.get("/api/picture/tags");
  return res.data.data;
};

export const getExplorePictures = async (
  tag?: string,
  nextCursor?: string,
): Promise<{ data: PictureType[]; nextCursor?: string }> => {
  const res = await api.get("/api/picture/explore", {
    params: { tag, nextCursor },
  });
  return res.data;
};

export const createPictureUpload = async (payload: {
  title: string;
  description?: string;
  tags: { id: number; name: string }[];
  url: string;
}) => {
  const res = await api.post("/api/picture/create", payload);
  return res.data.message;
};

export const getAllUploadsStatus = async (): Promise<
  UnderProcessingPictureType[]
> => {
  const res = await api.get("/api/picture/status");
  return res.data.data;
};

export const getPictureStatus = async (pictureID: string) => {
  const res = await api.get(`/api/picture/status/${pictureID}`);
  return res.data.data;
};

export const incrementViewCount = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await api.post(`/api/picture/view/${id}`);
  return res.data;
};

export const incrementDownloadCount = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await api.post(`/api/picture/download/${id}`);
  return res.data;
};

export const incrementLikeCount = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await api.post(`/api/picture/like/${id}`);
  return res.data;
};

export const getPictureById = async (
  id: string,
): Promise<{ data: PictureType }> => {
  const res = await api.get(`/api/picture/${id}`);
  return res.data;
};
