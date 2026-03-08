import { z } from "zod";
import {
  NAME_MAX_CHAR_LIMIT,
  EMAIL_MAX_CHAR_LIMIT,
  PASSWORD_MAX_CHAR_LIMIT,
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
