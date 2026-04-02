import { getCollections, getUserCollections } from "@/lib/apis";
import { useQuery } from "@tanstack/react-query";

export const useGetCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
};

export const useGetUserCollections = (userId: string) => {
  return useQuery({
    queryKey: ["user-collections", userId],
    queryFn: () => getUserCollections(userId),
  });
};
