import z from "zod";
import { nameSchema } from "./authSchema";
import {
  BIO_MAX_CHAR_LIMIT,
  LOCATION_MAX_CHAR_LIMIT,
} from "@workspace/constants";

export const settingSchema = z.object({
  avatar: z.string().url("Invalid URL").optional(),
  name: nameSchema.optional(),
  bio: z
    .string()
    .max(
      BIO_MAX_CHAR_LIMIT,
      `Bio must be at most ${BIO_MAX_CHAR_LIMIT} characters long`,
    )
    .optional(),
  location: z
    .string()
    .max(
      LOCATION_MAX_CHAR_LIMIT,
      `Location must be at most ${LOCATION_MAX_CHAR_LIMIT} characters long`,
    )
    .optional(),
  links: z
    .array(
      z.object({
        name: z.string().min(1, "Invalid URL name"),
        url: z.string().url("Invalid URL"),
      }),
    )
    .optional(),
});
