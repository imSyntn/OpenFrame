import { ErrorWithStatus } from "@/middleware";
import { searchPictures, searchTags, searchUsers } from "@/service";
import { NextFunction, Request, Response } from "express";

export const searchController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { q, type } = req.query;
    if (!q || typeof q !== "string") {
      return next(new ErrorWithStatus(400, "Query is required"));
    }

    if (q.length < 3) {
      return next(new ErrorWithStatus(400, "Query is too short"));
    }

    switch (type) {
      case undefined: {
        const [pictures, users, tags] = await Promise.all([
          searchPictures(q as string),
          searchUsers(q as string),
          searchTags(q as string),
        ]);

        return res.status(200).json({ data: { pictures, users, tags } });
      }
      case "picture":
        const pictures = await searchPictures(q as string);
        return res
          .status(200)
          .json({ data: { pictures, users: [], tags: [] } });
      case "user":
        const users = await searchUsers(q as string);
        return res
          .status(200)
          .json({ data: { users, pictures: [], tags: [] } });
      default:
        return next(new ErrorWithStatus(400, "Invalid type"));
    }
  } catch (error) {
    return next(error);
  }
};
