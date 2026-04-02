import { z } from "zod";
import {
  NAME_MAX_CHAR_LIMIT,
  EMAIL_MAX_CHAR_LIMIT,
  PASSWORD_MAX_CHAR_LIMIT,
  PIC_TITLE_MAX_CHAR_LIMIT,
  PIC_DESCRIPTION_MAX_CHAR_LIMIT,
  COLLECTION_TITLE_MAX_CHAR_LIMIT,
  COLLECTION_DESCRIPTION_MAX_CHAR_LIMIT,
} from "@workspace/constants";

const emailSchema = z
  .string()
  .max(
    EMAIL_MAX_CHAR_LIMIT,
    `Email must be at most ${EMAIL_MAX_CHAR_LIMIT} characters long`,
  )
  .email("Invalid email address");

const passwordSchema = z
  .string()
  .max(
    PASSWORD_MAX_CHAR_LIMIT,
    `Password must be at most ${PASSWORD_MAX_CHAR_LIMIT} characters long`,
  );

export const userSignupSchema = z.object({
  name: z
    .string()
    .max(
      NAME_MAX_CHAR_LIMIT,
      `Name must be at most ${NAME_MAX_CHAR_LIMIT} characters long`,
    ),
  email: emailSchema,
  password: passwordSchema,
});

export const userSigninSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const pictureSchema = z.object({
  url: z.string().url("Invalid URL"),
  pictureId: z.string().min(1, "Invalid picture ID"),
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
