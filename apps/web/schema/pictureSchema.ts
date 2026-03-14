import {
  PIC_DESCRIPTION_MAX_CHAR_LIMIT,
  PIC_TITLE_MAX_CHAR_LIMIT,
} from "@workspace/constants";
import { z } from "zod";

export const pictureSchema = z.object({
  url: z.string().url("Invalid URL"),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(
      PIC_TITLE_MAX_CHAR_LIMIT,
      `Title must be at most ${PIC_TITLE_MAX_CHAR_LIMIT} characters long`,
    ),
  description: z
    .string()
    .max(
      PIC_DESCRIPTION_MAX_CHAR_LIMIT,
      `Description must be at most ${PIC_DESCRIPTION_MAX_CHAR_LIMIT} characters long`,
    )
    .optional(),
  tags: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .min(1, "Minimum 1 tag is required")
    .max(10, "Maximum 10 tags are allowed"),
});
