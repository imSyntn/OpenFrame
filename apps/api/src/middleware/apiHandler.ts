import { Request, Response, NextFunction } from "express";
import { getApiKeyData } from "@/service";
import { ErrorWithStatus } from "./error";
import { userApiKeyLimiter } from "./rateLimit";
import crypto from "node:crypto";
import cors from "cors";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

export const handleInternalTokenCors = cors({
  origin: allowedOrigins,
  credentials: true,
});

const INTERNAL_TOKEN_TTL = 60_000;

function isValidInternalToken(token: string): boolean {
  const [timestamp, signature] = token.split(".");

  if (!timestamp || !signature) {
    return false;
  }

  const timestampNumber = Number(timestamp);

  if (!Number.isFinite(timestampNumber)) {
    return false;
  }

  const age = Date.now() - timestampNumber;

  if (age < 0 || age > INTERNAL_TOKEN_TTL) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.INTERNAL_SECRET!)
    .update(timestamp)
    .digest("hex");

  const providedBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

export const handleApi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.path === "/user/google" || req.path === "/user/google/callback") {
      return next();
    }
    const internalToken = req.get("x-internal-token");

    if (internalToken && isValidInternalToken(internalToken)) {
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
