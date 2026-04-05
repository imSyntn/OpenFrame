import { SearchResultType } from "@workspace/types";
import { api } from "../axios";

export const search = async (
  q: string,
  type?: string,
  signal?: AbortSignal,
): Promise<{ data: SearchResultType }> => {
  const res = await api.get(`/api/search`, {
    params: { q, type },
    signal,
  });
  return res.data;
};
