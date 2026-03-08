import {
  EMAIL_MIN_CHAR_LIMIT,
  EMAIL_MAX_CHAR_LIMIT,
  PASSWORD_MIN_CHAR_LIMIT,
  PASSWORD_MAX_CHAR_LIMIT,
  NAME_MIN_CHAR_LIMIT,
  NAME_MAX_CHAR_LIMIT,
  OTP_CHAR_LIMIT,
} from "@workspace/constants";
import { z } from "zod";

const emailSchema = z
  .string()
  .min(
    EMAIL_MIN_CHAR_LIMIT,
    `Email must be at least ${EMAIL_MIN_CHAR_LIMIT} characters long`,
  )
  .max(
    EMAIL_MAX_CHAR_LIMIT,
    `Email must be at most ${EMAIL_MAX_CHAR_LIMIT} characters long`,
  )
  .email("Invalid email address");

const passwordSchema = z
  .string()
  .min(
    PASSWORD_MIN_CHAR_LIMIT,
    `Password must be at least ${PASSWORD_MIN_CHAR_LIMIT} characters long`,
  )
  .max(
    PASSWORD_MAX_CHAR_LIMIT,
    `Password must be at most ${PASSWORD_MAX_CHAR_LIMIT} characters long`,
  )
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character",
  )
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter");

export const nameSchema = z
  .string()
  .min(
    NAME_MIN_CHAR_LIMIT,
    `Name must be at least ${NAME_MIN_CHAR_LIMIT} characters long`,
  )
  .max(
    NAME_MAX_CHAR_LIMIT,
    `Name must be at most ${NAME_MAX_CHAR_LIMIT} characters long`,
  );

export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const otpSchema = z
  .string()
  .length(OTP_CHAR_LIMIT, `OTP must be ${OTP_CHAR_LIMIT} digits long`);

export const forgotPasswordSchema = z
  .object({
    email: emailSchema,
    otp: otpSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
