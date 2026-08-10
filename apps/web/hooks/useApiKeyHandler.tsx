import { userDisableApiKey, userGenerateApiKey, userGetApiKeys } from "@/lib/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGenerateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name }: { name: string }) => userGenerateApiKey(name),
    onMutate: () => {
      toast.loading("Generating API Key...", {
        description: "Please wait...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.dismiss();
      toast.success("API Key generated successfully", {
        description: "You can now use it to access your data.",
      });
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error("API Key generation failed", {
        description: error?.response?.data?.message || "Something went wrong",
      });
    },
  });
};

export const useGetApiKeys = (enabled: boolean) => {
  return useQuery({
    queryKey: ["api-keys"],
    queryFn: () => userGetApiKeys(),
    enabled,
  });
};

export const useDisableApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => userDisableApiKey(id),
    onMutate: () => {
      toast.loading("Disabling API Key...", {
        description: "Please wait...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.dismiss();
      toast.success("API Key disabled successfully", {
        description: "You can no longer use it to access your data.",
      });
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error("API Key disabling failed", {
        description: error?.response?.data?.message || "Something went wrong",
      });
    },
  });
};
