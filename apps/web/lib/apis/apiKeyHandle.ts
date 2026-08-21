import { ApiKeyType } from "@workspace/types";
import { api } from "../axios";

export const userGenerateApiKey = async (
  name: string,
): Promise<{ data: { apiKey: ApiKeyType }; message: string }> => {
  const res = await api.post(`/keys`, { name });
  return res.data;
};

export const userGetApiKeys = async (): Promise<{
  data: { keys: ApiKeyType[] | [] };
}> => {
  const res = await api.get(`/keys`);
  return res.data;
};

export const userDisableApiKey = async (
  id: number,
): Promise<{ message: string }> => {
  const res = await api.patch(`/keys/${id}`);
  return res.data;
};
