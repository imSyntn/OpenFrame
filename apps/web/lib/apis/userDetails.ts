import { api } from "../axios";
import { ProfileType } from "@/@types";

export const getUserDetails = async (id: string): Promise<ProfileType> => {
  const res = await api.get(`/user/${id}`);
  return res.data.data;
};

export const updateUserDetails = async (
  id: string,
  payload: Partial<ProfileType>,
): Promise<ProfileType> => {
  const res = await api.patch(`/user/${id}`, payload);
  return res.data.data;
};

export const deleteUser = async (): Promise<{ message: string }> => {
  const res = await api.delete(`/user/delete`);
  return res.data;
};
