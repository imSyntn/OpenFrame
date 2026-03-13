import { ErrorWithStatus } from "@/middleware";
import { getPictureUploadUrl, getUserPictures } from "@/service";
import { Request, Response, NextFunction } from "express";

export const getUserPicturesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, page } = req.params;

    if (!id || !page) {
      return next(new ErrorWithStatus(400, "Invalid id or page"));
    }

    const userPictures = await getUserPictures(
      id as string,
      parseInt(page as string),
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
    const { type, size } = req.body;

    if (!type || !size) {
      return next(new ErrorWithStatus(400, "Invalid type or size"));
    }

    const urlData = await getPictureUploadUrl(type, size);

    return res.status(200).json({ data: urlData });
  } catch (error) {
    next(error);
  }
};
