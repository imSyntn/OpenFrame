import { z } from "zod";

const emailSchema = z
  .string()
  .min(3, "Email must be at least 3 characters long")
  .max(30, "Email must be at most 30 characters long")
  .email("Invalid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(30, "Password must be at most 30 characters long")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character",
  )
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter");

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(80, "Name must be at most 80 characters long"),
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

export const forgotPasswordSchema = z
  .object({
    email: emailSchema,
    otp: z.string().length(6, "OTP must be 6 digits long"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
