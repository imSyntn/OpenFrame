import {
  createCollection,
  deleteCollection,
  getCollections,
  getUserCollections,
  removeCollectionItems,
  updateCollection,
} from "@/lib/apis";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCollections = () => {
  return useInfiniteQuery({
    queryKey: ["collections"],
    queryFn: ({ pageParam }) => getCollections(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });
};

export const useGetUserCollections = (userId: string) => {
  return useQuery({
    queryKey: ["user-collections", userId],
    queryFn: () => getUserCollections(userId),
  });
};

export const useCreateCollection = () => {
  return useMutation({
    mutationFn: (data: {
      title: string;
      description?: string;
      visibility: string;
    }) => createCollection(data),
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create collection");
    },
    onMutate: () => {
      toast.loading("Creating collection...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Collection created successfully");
    },
  });
};

export const useUpdateCollection = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title?: string; description?: string; visibility?: string };
    }) => updateCollection(id, data),
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update collection");
    },
    onMutate: () => {
      toast.loading("Updating collection...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Collection updated successfully");
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCollection(id),
    onError: (error: any) => {
      toast.dismiss();
      console.log(error);

      toast.error(error.response.data.message || "Failed to delete collection");
    },
    onMutate: () => {
      toast.loading("Deleting collection...");
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["user-collections"] });
      toast.success("Collection deleted successfully");
    },
  });
};

export const useDeleteCollectionItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, pic_ids }: { id: string; pic_ids: string[] }) =>
      removeCollectionItems(id, pic_ids),
    onError: (error: any) => {
      toast.dismiss();
      console.log(error);

      toast.error(error.response.data.message || "Failed to delete item.");
    },
    onMutate: () => {
      toast.loading("Deleting items...");
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["user-collections"] });
      toast.success("Items deleted successfully");
    },
  });
};
