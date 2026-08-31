import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ImageGenerateSchema } from "@workspace/schema/index";
import { generateImage } from "@/lib/apis/textToImage";
import { useImageGenerationStore } from "@/components/Provider";

export function useGenerateImage() {
  const setStatus = useImageGenerationStore((state) => state.setStatus);
  const setCurrentResult = useImageGenerationStore(
    (state) => state.setCurrentResult,
  );
  const setError = useImageGenerationStore((state) => state.setError);

  return useMutation({
    mutationFn: (payload: z.infer<typeof ImageGenerateSchema>) =>
      generateImage(payload),
    onMutate: () => {
      setStatus("generating");
    },
    onSuccess: (result) => {
      setStatus("success");
      setCurrentResult(result.data);
    },
    onError: (error: any) => {
      setStatus("error");
      setError(
        error?.response?.data?.message ||
          "We encountered an issue creating your image. Please check your settings or try again in a moment.",
      );
    },
  });
}
