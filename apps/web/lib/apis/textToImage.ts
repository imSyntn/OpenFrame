import { z } from "zod";
import { ImageGenerateSchema } from "@workspace/schema/index";
import { api } from "../axios";
import { GenerationResult } from "@/@types";

export const generateImage = async (
  payload: z.infer<typeof ImageGenerateSchema>,
): Promise<{ message: string; data: GenerationResult }> => {
  const res = await api.post("/text-to-image", payload);
  return res.data;
};
