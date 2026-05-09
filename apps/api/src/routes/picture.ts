import { Router } from "express";
import {
  createPictureController,
  deletePictureController,
  downloadPictureController,
  getAllPictureStatusController,
  getExplorePicturesController,
  getPictureByIdController,
  getPictureStatusController,
  getPictureTagsController,
  getPictureUploadUrlController,
  getUserLikedPicturesController,
  getUserPicturesController,
  likePictureController,
  viewPictureController,
} from "../controller/picture.controller";
import {
  authMiddleware,
  checkPictureOwner,
  pollingLimiter,
  uploadLimiter,
} from "@/middleware";

const pictureRouter = Router();

pictureRouter.get("/tags", getPictureTagsController);
pictureRouter.get("/explore", getExplorePicturesController);

pictureRouter.post(
  "/create",
  uploadLimiter,
  authMiddleware,
  createPictureController,
);
pictureRouter.get(
  "/status",
  pollingLimiter,
  authMiddleware,
  getAllPictureStatusController,
);
pictureRouter.get(
  "/status/:pictureID",
  authMiddleware,
  getPictureStatusController,
);

pictureRouter.get("/user/liked/:userId", getUserLikedPicturesController);
pictureRouter.get("/user/:id", getUserPicturesController);

pictureRouter.post(
  "/upload-url",
  uploadLimiter,
  authMiddleware,
  getPictureUploadUrlController,
);

pictureRouter.post("/view/:id", viewPictureController);
pictureRouter.post("/download/:id", downloadPictureController);
pictureRouter.post("/like/:id", authMiddleware, likePictureController);

pictureRouter.delete(
  "/:id",
  authMiddleware,
  checkPictureOwner,
  deletePictureController,
);

pictureRouter.get("/:id", getPictureByIdController);

export { pictureRouter };
