import { z } from "zod";

export const reportSchema = z.object({
  title: z
    .string()
    .min(3, "Title is too short")
    .max(50, "Title is too long")
    .trim(),
  reason: z
    .string()
    .min(10, "Reason is too short")
    .max(1000, "Reason is too long")
    .trim(),
});

export const reportUpdateSchema = z.object({
  status: z.enum(["PENDING", "UNDER_REVIEW", "RESOLVED", "REJECTED"]),
  note: z.string().optional(),
});
