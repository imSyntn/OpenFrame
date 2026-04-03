import { Router } from "express";
import {
  createPictureController,
  downloadPictureController,
  getAllPictureStatusController,
  getExplorePicturesController,
  getPictureByIdController,
  getPictureStatusController,
  getPictureTagsController,
  getPictureUploadUrlController,
  getUserPicturesController,
  likePictureController,
  viewPictureController,
} from "../controller/picture.controller";
import { authMiddleware } from "@/middleware";

const pictureRouter = Router();

pictureRouter.get("/tags", getPictureTagsController);
pictureRouter.get("/explore", getExplorePicturesController);

pictureRouter.post("/create", authMiddleware, createPictureController);
pictureRouter.get("/status", authMiddleware, getAllPictureStatusController);
pictureRouter.get(
  "/status/:pictureID",
  authMiddleware,
  getPictureStatusController,
);

pictureRouter.get("/user/:id", getUserPicturesController);

pictureRouter.post(
  "/upload-url",
  authMiddleware,
  getPictureUploadUrlController,
);

pictureRouter.post("/view/:id", viewPictureController);
pictureRouter.post("/download/:id", downloadPictureController);

pictureRouter.post("/like/:id", authMiddleware, likePictureController);

pictureRouter.get("/:id", getPictureByIdController);

export { pictureRouter };
