import {
  createPictureUpload,
  deletePicture,
  getAllUploadsStatus,
  getExplorePictures,
  getPictureById,
  getPictureStatus,
  getPictureTags,
  getPictureUploadUrl,
  getUserLikedPictures,
  getUserPictures,
  incrementDownloadCount,
  incrementLikeCount,
  incrementViewCount,
} from "@/lib/apis";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetPictures = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["user-pictures", id],
    queryFn: ({ pageParam }) => getUserPictures(id, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });
};

export const useGetUserLikedPictures = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["user-liked-pictures", userId],
    queryFn: ({ pageParam }) => getUserLikedPictures(userId, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    enabled: !!userId,
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
    refetchIntervalInBackground: true,
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
    mutationFn: (data: { id: string; ownerId: string }) =>
      incrementViewCount(data),
  });
};

export const useIncrementDownloadCount = () => {
  return useMutation({
    mutationFn: (data: { id: string; ownerId: string }) =>
      incrementDownloadCount(data),
  });
};

export const useIncrementLikeCount = () => {
  return useMutation({
    mutationFn: (id: string) => incrementLikeCount(id),
    onSuccess: () => {
      toast.success("Liked successfully.", {
        description: "It may take some time to show on profile.",
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to like.");
    },
  });
};

export const useGetPictureById = (id: string) => {
  return useQuery({
    queryKey: ["picture", id],
    queryFn: () => getPictureById(id),
  });
};

export const useDeletePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string; userId: string }) => deletePicture(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user-pictures", variables.userId],
      });
      toast.success("Picture deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete picture");
    },
  });
};
