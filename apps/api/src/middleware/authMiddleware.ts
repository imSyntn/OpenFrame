import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "./error";
import { accessTokenVerify, refreshTokenVerify } from "@/utils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorWithStatus(401, "Unauthorized"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new ErrorWithStatus(401, "Unauthorized"));
    }

    const decoded = accessTokenVerify(token);
    req.user = decoded;

    next();
  } catch (error) {
    return next(new ErrorWithStatus(401, "Invalid or expired token"));
  }
};
