import { Router } from "express";
import {
  createPictureController,
  downloadPictureController,
  getAllPictureStatusController,
  getExplorePicturesController,
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

pictureRouter.get("/user/:id/:page", getUserPicturesController);

pictureRouter.post(
  "/upload-url",
  authMiddleware,
  getPictureUploadUrlController,
);

pictureRouter.post("/view/:id", viewPictureController);
pictureRouter.post("/download/:id", downloadPictureController);

pictureRouter.post("/like/:id", authMiddleware, likePictureController);

pictureRouter.get("/:id", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

export { pictureRouter };
