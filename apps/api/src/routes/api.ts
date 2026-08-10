import { apiKeyHandlerLimiter, authMiddleware } from "@/middleware";
import {
  disableApiKeyController,
  generateApiKeyController,
  getApiKeysController,
} from "@/controller";
import { Router } from "express";

const apiRouter = Router();

apiRouter.post(
  "/",
  apiKeyHandlerLimiter,
  authMiddleware,
  generateApiKeyController,
);

apiRouter.get("/", apiKeyHandlerLimiter, authMiddleware, getApiKeysController);

apiRouter.patch(
  "/:id",
  apiKeyHandlerLimiter,
  authMiddleware,
  disableApiKeyController,
);

export { apiRouter };
