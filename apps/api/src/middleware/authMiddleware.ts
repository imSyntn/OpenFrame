import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "./error";
import { accessTokenVerify } from "@/utils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["access_token"];

    if (!token) {
      return next(new ErrorWithStatus(401, "You are not logged in."));
    }

    const decoded = accessTokenVerify(token);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ErrorWithStatus(401, "Invalid or expired token."));
  }
};
