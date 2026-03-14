import { Router } from "express";
import {
  createPictureController,
  getAllPictureStatusController,
  getPictureStatusController,
  getPictureTagsController,
  getPictureUploadUrlController,
  getUserPicturesController,
} from "../controller/picture.controller";
import { authMiddleware } from "@/middleware";

const pictureRouter = Router();

pictureRouter.get("/tags", getPictureTagsController);

pictureRouter.post("/create", authMiddleware, createPictureController);
pictureRouter.get("/status", authMiddleware, getAllPictureStatusController);
pictureRouter.get(
  "/status/:pictureID",
  authMiddleware,
  getPictureStatusController,
);

pictureRouter.get("/user/:id/:page", getUserPicturesController);

pictureRouter.post(
  "/upload-url",
  authMiddleware,
  getPictureUploadUrlController,
);

pictureRouter.get("/:id", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

export { pictureRouter };
