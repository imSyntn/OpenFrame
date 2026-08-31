import { createImageController } from "@/controller";
import { authMiddleware, imageGenLimiter } from "@/middleware";
import { Router } from "express";

const textToImageRouter: Router = Router();

textToImageRouter.post(
  "/",
  imageGenLimiter,
  authMiddleware,
  createImageController,
);

export { textToImageRouter };
