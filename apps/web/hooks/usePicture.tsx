import {
  createPictureUpload,
  getAllUploadsStatus,
  getExplorePictures,
  getPictureStatus,
  getPictureTags,
  getPictureUploadUrl,
  getUserPictures,
  incrementDownloadCount,
  incrementViewCount,
} from "@/lib/apis";
import { useGlobalStateStore, useProfileStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useGetExplorePictures = () => {
  const setPictures = useGlobalStateStore((state) => state.setPictures);
  const pictures = useGlobalStateStore((state) => state.pictures);
  const setLoading = useGlobalStateStore((state) => state.setPicturesLoading);
  return useMutation({
    mutationFn: ({ tag, nextCursor }: { tag: string; nextCursor: string }) =>
      getExplorePictures(tag, nextCursor),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data, { tag, nextCursor }) => {
      if (!tag) {
        if (!data.nextCursor) {
          toast.info("No more pictures found");
          return;
        }
        setPictures({
          pictures: [...pictures, ...data.pictures],
          nextCursor: data.nextCursor,
        });
      } else {
        if (!data.nextCursor) {
          toast.info("No more pictures found");
          return;
        }
        if (!nextCursor) {
          setPictures(data);
        } else {
          setPictures({
            pictures: [...pictures, ...data.pictures],
            nextCursor: data.nextCursor,
          });
        }
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to fetch pictures");
    },
    onSettled: () => {
      setLoading(false);
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
