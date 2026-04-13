import { api } from "../axios";
import { ProfileType } from "@/@types";

export const getUserDetails = async (id: string): Promise<ProfileType> => {
  const res = await api.get(`/api/user/${id}`);
  return res.data.data;
};

export const updateUserDetails = async (
  id: string,
  payload: Partial<ProfileType>,
): Promise<ProfileType> => {
  const res = await api.patch(`/api/user/${id}`, payload);
  return res.data.data;
};

export const deleteUser = async (): Promise<{ message: string }> => {
  const res = await api.delete(`/api/user/delete`);
  return res.data;
};
