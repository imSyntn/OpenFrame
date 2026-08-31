import {
  MAX_NEG_PROMPT_SIZE,
  MAX_PROMPT_SIZE,
  MIN_PROMPT_SIZE,
  STYLE_ENUM,
  DEFAULT_STYLE,
  DEAFULT_ASPECT_RATIO,
  DEFAULT_MODEL,
} from "@workspace/constants";
import { z } from "zod";

export const ImageGenerateSchema = z.object({
  prompt: z
    .string()
    .min(
      MIN_PROMPT_SIZE,
      `Prompt must be at least ${MIN_PROMPT_SIZE} characters long`,
    )
    .max(
      MAX_PROMPT_SIZE,
      `Prompt must be ${MAX_PROMPT_SIZE} characters or less`,
    ),
  negPrompt: z
    .string()
    .max(
      MAX_NEG_PROMPT_SIZE,
      `Negative prompt must be ${MAX_NEG_PROMPT_SIZE} characters or less`,
    )
    .optional(),
  artStyle: z.enum(STYLE_ENUM as [string, ...string[]]).default(DEFAULT_STYLE),
  // aspectRatio: z.string().default(DEAFULT_ASPECT_RATIO),
  public: z.boolean().default(true),
  // format: z.enum(FORMATS as [string, ...string[]]).default(DEFAULT_FORMAT),
  model: z.string().default(DEFAULT_MODEL),
  // seed: z.coerce.number().default(-1).optional(),
  // numSteps: z
  //   .coerce.number()
  //   .min(MIN_STEPS, `Min steps: ${MIN_STEPS}`)
  //   .max(MAX_STEPS, `Max steps: ${MAX_STEPS}`)
  //   .default(DEFAULT_STEPS)
  //   .optional(),
  // cfg: z
  //   .coerce.number()
  //   .min(MIN_CFG, `Min CFG: ${MIN_CFG}`)
  //   .max(MAX_CFG, `Max CFG: ${MAX_CFG}`)
  //   .default(DEFAULT_CFG),
});
