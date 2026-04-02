import { getCollections } from "@/lib/apis";
import { useQuery } from "@tanstack/react-query";

export const useGetCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
};
