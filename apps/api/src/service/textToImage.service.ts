import { ImageGenerateSchema } from "@workspace/schema/index";
import type { z } from "zod";

interface ResponseType {
  created: number;
  data: [
    {
      b64_json: string;
      revised_prompt: string;
    },
  ];
  model: string;
  requested_model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

function buildPrompt({
  prompt,
  negPrompt,
  artStyle,
}: z.infer<typeof ImageGenerateSchema>) {
  const parts = [
    prompt,
    `Style: ${artStyle}`,
    negPrompt ? `Do not include: ${negPrompt}` : null,
  ];

  return parts.filter(Boolean).join(". ");
}

export const createImage = async (
  data: z.infer<typeof ImageGenerateSchema>,
) => {
  const prompt = buildPrompt(data);

  const payload = {
    prompt,
    model: data.model,
    n: 1,
  };

  console.log(payload);
  const res = await fetch(process.env.IMAGE_GEN_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.IMAGE_GEN_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to generate image");
  }

  const result = (await res.json()) as ResponseType;
  return result;
};
