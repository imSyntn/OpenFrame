import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class ErrorWithStatus extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const statusCode = err instanceof ErrorWithStatus ? err.status : 500;
  const message =
    err instanceof ErrorWithStatus ? err.message : "Internal Server Error";
  return res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
