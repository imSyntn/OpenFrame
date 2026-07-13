import { getCollectionById, getPictureById } from "@/service";
import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "./error";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { email: string };

    if (!user?.email) {
      return next(new ErrorWithStatus(401, "Unauthorized"));
    }

    if (user.email !== process.env.ADMIN_EMAIL) {
      return next(new ErrorWithStatus(403, "Unauthorized"));
    }

    return next();
  } catch (error) {
    next(error);
  }
};

export const checkCollectionOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: collection_id } = req.params;

    const user = req.user as { id: string };

    if (!user?.id) {
      return next(new ErrorWithStatus(401, "Unauthorized"));
    }

    const collection = await getCollectionById(collection_id as string, true);
    if (!collection) {
      return next(new ErrorWithStatus(404, "Collection not found"));
    }

    if (collection.creator_id !== user.id) {
      return next(new ErrorWithStatus(403, "Unauthorized"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const checkPictureOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: pictureId } = req.params;
    const user = req.user as { id: string };

    if (!user?.id) {
      return next(new ErrorWithStatus(401, "Unauthorized"));
    }

    const picture = await getPictureById(pictureId as string);
    if (!picture) {
      return next(new ErrorWithStatus(404, "Picture not found"));
    }

    if (picture.user_id !== user.id) {
      return next(new ErrorWithStatus(403, "Unauthorized"));
    }
    next();
  } catch (error) {
    next(error);
  }
};
