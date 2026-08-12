import { ApiKeyType } from "@workspace/types";
import { api } from "../axios";

export const userGenerateApiKey = async (
  name: string,
): Promise<{ data: { apiKey: ApiKeyType }; message: string }> => {
  const res = await api.post(`/api/keys`, { name });
  return res.data;
};

export const userGetApiKeys = async (): Promise<{
  data: { keys: ApiKeyType[] | [] };
}> => {
  const res = await api.get(`/api/keys`);
  return res.data;
};

export const userDisableApiKey = async (
  id: number,
): Promise<{ message: string }> => {
  const res = await api.patch(`/api/keys/${id}`);
  return res.data;
};
