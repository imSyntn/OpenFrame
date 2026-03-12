import { PictureType } from "@/@types";
import { api } from "../axios";

export const getUserPictures = async (
  id: string,
  page: number,
): Promise<PictureType[]> => {
  const res = await api.get(`/api/picture/user/${id}/${page}`);
  return res.data.data;
};
