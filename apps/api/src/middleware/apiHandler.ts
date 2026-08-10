import { Request, Response, NextFunction } from "express";
import { getApiKeyData } from "@/service";
import { ErrorWithStatus } from "./error";
import { userApiKeyLimiter } from "./rateLimit";

export const handleApi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const origin = req.get("origin");

    const isMyWebsite = [
      "https://open-frame.sayantan.online",
      "https://open-frame-web.vercel.app",
      "http://localhost:3000",
    ].includes(origin ?? "");

    if (isMyWebsite) {
      return next();
    }

    if (req.method !== "GET") {
      return next(new ErrorWithStatus(405, "Only GET requests are allowed"));
    }

    const apiKey = req.get("x-api-key");

    if (!apiKey) {
      return next(new ErrorWithStatus(401, "API key required"));
    }

    const apiData = await getApiKeyData(apiKey);

    if (!apiData || !apiData.isActive) {
      return next(new ErrorWithStatus(401, "Invalid API key"));
    }

    req.apiKey = apiKey;

    return userApiKeyLimiter(req, res, next);
  } catch (error) {
    console.error("API middleware error:", error);
    return next(new ErrorWithStatus(500, "Error in api handler"));
  }
};
