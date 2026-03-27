import { ErrorWithStatus } from "@/middleware";
import { pictureSchema } from "@/schema";
import {
  createPicture,
  getAllPictureStatus,
  getPictureStatus,
  getPictureTags,
  getPictureUploadUrl,
  getUserPictures,
} from "@/service";
import { MAX_AVATAR_SIZE, MAX_PICTURE_SIZE } from "@workspace/constants";
import { Request, Response, NextFunction } from "express";

export const getUserPicturesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, page } = req.params;
    const nextCursor = req.query.nextCursor as string;

    if (!id || !page) {
      return next(new ErrorWithStatus(400, "Invalid id or page"));
    }

    const userPictures = await getUserPictures(
      id as string,
      parseInt(page as string),
      nextCursor as string,
    );

    return res.status(200).json({ data: userPictures });
  } catch (error) {
    next(error);
  }
};

export const getPictureUploadUrlController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { type, size, isAvatar } = req.body;

    if (!type || !size) {
      return next(new ErrorWithStatus(400, "Invalid type or size"));
    }

    if (isAvatar && size > MAX_AVATAR_SIZE) {
      return next(
        new ErrorWithStatus(400, "File size exceeds the limit of 2MB"),
      );
    }
    if (!isAvatar && size > MAX_PICTURE_SIZE) {
      return next(
        new ErrorWithStatus(400, "File size exceeds the limit of 10MB"),
      );
    }

    const urlData = await getPictureUploadUrl(type, size, !!isAvatar);

    return res.status(200).json({ data: urlData });
  } catch (error) {
    next(error);
  }
};

export const getPictureTagsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tags = await getPictureTags();

    return res.status(200).json({ data: tags });
  } catch (error) {
    next(error);
  }
};

export const createPictureController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, tags, url, pictureId } = req.body;
    const { id: userID } = req.user as { id: string };

    const picture = pictureSchema.parse({
      title,
      description,
      tags,
      url,
      pictureId,
    });

    await createPicture(
      picture.title,
      picture.description || "",
      picture.tags,
      picture.url,
      userID,
      picture.pictureId,
    );

    return res.status(200).json({ message: "Picture uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllPictureStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userID } = req.user as { id: string };

    if (!userID) {
      return next(new ErrorWithStatus(400, "Invalid user id"));
    }

    const picture = await getAllPictureStatus(userID);

    return res.status(200).json({ data: picture });
  } catch (error) {
    next(error);
  }
};

export const getPictureStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userID } = req.user as { id: string };
    const { pictureID } = req.params as { pictureID: string };

    if (!userID) {
      return next(new ErrorWithStatus(400, "Invalid user id"));
    }
    if (!pictureID) {
      return next(new ErrorWithStatus(400, "Invalid picture id"));
    }

    const picture = await getPictureStatus(userID, pictureID);

    return res.status(200).json({ data: picture });
  } catch (error) {
    next(error);
  }
};
