import { getCollectionById } from "@/service";
import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "./error";

export const checkOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: collection_id } = req.params;
    const { id: user_id } = req.user as { id: string };

    const collection = await getCollectionById(collection_id as string, true);
    if (!collection) {
      return next(new ErrorWithStatus(404, "Collection not found"));
    }

    if (collection.creator_id !== user_id) {
      return next(new ErrorWithStatus(403, "Unauthorized"));
    }
    next();
  } catch (error) {
    next(error);
  }
};
