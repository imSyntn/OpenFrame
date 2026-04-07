import { z } from "zod";
import {
  COLLECTION_TITLE_MAX_CHAR_LIMIT,
  COLLECTION_DESCRIPTION_MAX_CHAR_LIMIT,
} from "@workspace/constants";

const titleSchema = z
  .string()
  .min(3, "Title must be at least 3 characters long")
  .max(
    COLLECTION_TITLE_MAX_CHAR_LIMIT,
    `Title must be at most ${COLLECTION_TITLE_MAX_CHAR_LIMIT} characters long`,
  );

const descriptionSchema = z
  .string()
  .max(
    COLLECTION_DESCRIPTION_MAX_CHAR_LIMIT,
    `Description must be at most ${COLLECTION_DESCRIPTION_MAX_CHAR_LIMIT} characters long`,
  )
  .optional();

export const collectionSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  cover_image: z.string().url("Invalid URL").optional(),
});

export const collectionUpdateSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema,
  visibility: z.enum(["PUBLIC", "PRIVATE"]).optional(),
  cover_image: z.string().url("Invalid URL").optional(),
});

export const collectionItemSchema = z
  .array(z.string())
  .min(1, { message: "Item can't be empty." });
