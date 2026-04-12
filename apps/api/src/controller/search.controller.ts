import { ErrorWithStatus } from "@/middleware";
import { searchPictures, searchTags, searchUsers } from "@/service";
import { cache } from "@workspace/lib/redis";
import { logger } from "@workspace/lib/logger";
import { NextFunction, Request, Response } from "express";

const setCache = async (key: string, prefixKey: string, value: any) => {
  await cache.set(key, JSON.stringify(value), "EX", 60 * 60 * 24);
  await cache.set(prefixKey, JSON.stringify(value), "EX", 60 * 60 * 24);
};

export const searchController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { q, type } = req.query as { q: string; type?: string };
    if (!q) {
      return next(new ErrorWithStatus(400, "Query is required"));
    }

    if (q.length < 3) {
      return next(new ErrorWithStatus(400, "Query is too short"));
    }
    logger.info(`query ${q} type ${type}`);
    const trimmedQuery = q.trim().toLowerCase();
    const cacheKey = `search:${trimmedQuery}`;
    const cachePrefixKey = `search:${trimmedQuery.slice(0, 3)}`;

    const exactCacheMatch = await cache.get(cacheKey);

    if (exactCacheMatch) {
      const data = JSON.parse(exactCacheMatch);
      if (type) {
        const result = { [type]: data[type] };
        return res.status(200).json({ data: result });
      }
      return res.status(200).json({ data });
    }

    const prefixCacheMatch = await cache.get(cachePrefixKey);

    if (prefixCacheMatch) {
      const data = JSON.parse(prefixCacheMatch);
      if (type) {
        const result = { [type]: data[type] };
        return res.status(200).json({ data: result });
      }
      return res.status(200).json({ data });
    }

    switch (type) {
      case undefined: {
        const [pictures, users, tags] = await Promise.all([
          searchPictures(q as string),
          searchUsers(q as string),
          searchTags(q as string),
        ]);
        await setCache(cacheKey, cachePrefixKey, { pictures, users, tags });
        return res.status(200).json({ data: { pictures, users, tags } });
      }

      case "pictures": {
        const pictures = await searchPictures(q as string);
        return res.status(200).json({ data: { pictures } });
      }

      case "users": {
        const users = await searchUsers(q as string);
        return res.status(200).json({ data: { users } });
      }

      case "tags": {
        const tags = await searchTags(q as string);
        return res.status(200).json({ data: { tags } });
      }

      default:
        return next(new ErrorWithStatus(400, "Invalid type"));
    }
  } catch (error) {
    return next(error);
  }
};
