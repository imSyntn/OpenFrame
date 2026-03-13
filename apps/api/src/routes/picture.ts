import { Router } from "express";
import {
  getPictureUploadUrlController,
  getUserPicturesController,
} from "../controller/picture.controller";
import { authMiddleware } from "@/middleware";

const pictureRouter = Router();

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
