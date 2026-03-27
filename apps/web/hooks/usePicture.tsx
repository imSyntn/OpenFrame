import {
  createPictureUpload,
  getAllUploadsStatus,
  getPictureStatus,
  getPictureTags,
  getPictureUploadUrl,
  getUserPictures,
} from "@/lib/apis";
import { useProfileStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPictures = () => {
  const addPictures = useProfileStore((state) => state.addPictures);
  const nextCursor = useProfileStore((state) => state.nextCursor);
  return useMutation({
    mutationFn: ({ id, page }: { id: string; page: number }) =>
      getUserPictures(id, page, nextCursor || ""),
    onSuccess: (data) => {
      addPictures(data.pictures, data.nextCursor);
    },
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
