import { ErrorWithStatus } from "@/middleware";
import { createApiKey, disableApiKey, getUserApiKeys } from "@/service";
import { generateApiKeySchema } from "@workspace/schema/auth";
import { Request, Response, NextFunction } from "express";

export const generateApiKeyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return next(new ErrorWithStatus(401, "Unauthorized"));
    }

    const { name } = generateApiKeySchema.parse(req.body);

    const existingKey = await getUserApiKeys(id, { isActive: true });

    if (existingKey.length > 0) {
      return next(
        new ErrorWithStatus(
          400,
          "You already have an active API key. Please disable it to create a new one.",
        ),
      );
    }

    const apiKey = await createApiKey({ userId: id, name });

    return res.status(200).json({
      message: "API key generated successfully",
      data: { apiKey },
    });
  } catch (error) {
    next(error);
  }
};

export const getApiKeysController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return next(new ErrorWithStatus(401, "Unauthorized"));
    }

    const apiKeys = await getUserApiKeys(id);

    return res.status(200).json({
      data: {
        keys: apiKeys,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const disableApiKeyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apiId = req.params.id as string;

    if (!apiId) {
      return next(new ErrorWithStatus(400, "API ID is required"));
    }

    await disableApiKey(Number(apiId));

    return res.status(200).json({
      message: "API key disabled successfully",
    });
  } catch (error) {
    next(error);
  }
};
