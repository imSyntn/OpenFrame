import {
  createPictureUpload,
  getAllUploadsStatus,
  getExplorePictures,
  getPictureById,
  getPictureStatus,
  getPictureTags,
  getPictureUploadUrl,
  getUserPictures,
  incrementDownloadCount,
  incrementLikeCount,
  incrementViewCount,
} from "@/lib/apis";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useGetPictures = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["user-pictures", id],
    queryFn: ({ pageParam }) => getUserPictures(id, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });
};

export const useGetExplorePictures = (tag?: string) => {
  return useInfiniteQuery({
    queryKey: ["explore-pictures", tag],

    queryFn: ({ pageParam }) => getExplorePictures(tag, pageParam),

    initialPageParam: "",

    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });
};

export const useGetUploadUrl = () => {
  return useMutation({
    mutationFn: ({
      type,
      size,
      isAvatar,
    }: {
      type: string;
      size: number;
      isAvatar?: boolean;
    }) => getPictureUploadUrl(type, size, isAvatar),
  });
};

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => getPictureTags(),
  });
};

export const useCreatePictureUpload = () => {
  return useMutation({
    mutationFn: (payload: {
      title: string;
      description?: string;
      tags: { id: number; name: string }[];
      url: string;
    }) => createPictureUpload(payload),
  });
};

export const useGetAllUploadsStatus = () => {
  return useQuery({
    queryKey: ["all-uploads-status"],
    queryFn: () => getAllUploadsStatus(),
    refetchInterval: 10000,
    refetchOnMount: true,
  });
};

export const useGetPictureStatus = (pictureID: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["picture-status", pictureID],
    queryFn: () => getPictureStatus(pictureID),
    enabled,
  });
};

export const useIncrementViewCount = () => {
  return useMutation({
    mutationFn: (id: string) => incrementViewCount(id),
  });
};

export const useIncrementDownloadCount = () => {
  return useMutation({
    mutationFn: (id: string) => incrementDownloadCount(id),
  });
};

export const useIncrementLikeCount = () => {
  return useMutation({
    mutationFn: (id: string) => incrementLikeCount(id),
  });
};

export const useGetPictureById = (id: string) => {
  return useQuery({
    queryKey: ["picture", id],
    queryFn: () => getPictureById(id),
  });
};
