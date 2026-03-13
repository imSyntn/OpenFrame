import { getPictureUploadUrl, getUserPictures } from "@/lib/apis";
import { useProfileStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

export const useGetPictures = () => {
  const addPictures = useProfileStore((state) => state.addPictures);
  return useMutation({
    mutationFn: ({ id, page }: { id: string; page: number }) =>
      getUserPictures(id, page),
    onSuccess: (data) => {
      addPictures(data);
    },
  });
};

export const useGetUploadUrl = () => {
  return useMutation({
    mutationFn: ({ type, size }: { type: string; size: number }) =>
      getPictureUploadUrl(type, size),
  });
};
