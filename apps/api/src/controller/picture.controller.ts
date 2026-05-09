import { ErrorWithStatus } from "@/middleware";
import { pictureSchema } from "@workspace/schema/picture";
import {
  createPicture,
  deletePicture,
  getAllPictureStatus,
  getExplorePictures,
  getPictureById,
  getPictureStatus,
  getPictureTags,
  getPictureUploadUrl,
  getUserLikedPictures,
  getUserPictures,
  incrementDownloadCount,
  incrementLikeCount,
  incrementViewCount,
} from "@/service";
import { MAX_AVATAR_SIZE, MAX_PICTURE_SIZE } from "@workspace/constants";
import { Request, Response, NextFunction } from "express";

export const getUserPicturesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const lastId = req.query.nextCursor as string;

    if (!id) {
      return next(new ErrorWithStatus(400, "Invalid id"));
    }

    const { pictures, nextCursor } = await getUserPictures(
      id as string,
      lastId,
    );

    return res.status(200).json({ data: pictures, nextCursor });
  } catch (error) {
    next(error);
  }
};

export const getUserLikedPicturesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params as { userId: string };
    const lastId = req.query.nextCursor as string;

    if (!userId) {
      return next(new ErrorWithStatus(400, "Invalid user id"));
    }

    const { pictures, nextCursor } = await getUserLikedPictures(userId, lastId);

    return res.status(200).json({ data: pictures, nextCursor });
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

export const getExplorePicturesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { nextCursor: lastId, tag } = req.query as {
      nextCursor: string;
      tag: string;
    };

    const { pictures, nextCursor } = await getExplorePictures(tag, lastId);

    return res.status(200).json({ data: pictures, nextCursor });
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

export const viewPictureController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const { ownerId } = req.body as { ownerId: string };

    if (!id) {
      return next(new ErrorWithStatus(404, "Invalid picture id"));
    }
    if (!ownerId) {
      return next(new ErrorWithStatus(404, "Invalid owner id"));
    }

    await incrementViewCount(id, ownerId);

    return res.status(200).json({ message: "Viewed" });
  } catch (error) {
    next(error);
  }
};

export const downloadPictureController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const { ownerId } = req.body as { ownerId: string };

    if (!id) {
      return next(new ErrorWithStatus(404, "Invalid picture id"));
    }
    if (!ownerId) {
      return next(new ErrorWithStatus(404, "Invalid owner id"));
    }

    await incrementDownloadCount(id, ownerId);

    return res.status(200).json({ message: "Downloaded" });
  } catch (error) {
    next(error);
  }
};

export const likePictureController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userID } = req.user as { id: string };
    const { id } = req.params as { id: string };

    if (!id) {
      return next(new ErrorWithStatus(400, "Invalid picture id"));
    }
    if (!userID) {
      return next(new ErrorWithStatus(400, "Invalid user id"));
    }

    await incrementLikeCount(id, userID);

    return res.status(200).json({ message: "Liked" });
  } catch (error) {
    next(error);
  }
};

export const getPictureByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return next(new ErrorWithStatus(400, "Invalid picture id"));
    }

    const picture = await getPictureById(id);

    return res.status(200).json({ data: picture });
  } catch (error) {
    next(error);
  }
};

export const deletePictureController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return next(new ErrorWithStatus(400, "Invalid picture id"));
    }

    await deletePicture(id);

    return res.status(200).json({ data: "Picture deleted successfully" });
  } catch (error) {
    next(error);
  }
};
