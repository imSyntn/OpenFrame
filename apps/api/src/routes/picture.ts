import { Router } from "express";
import { getUserPicturesController } from "../controller/picture.controller";

const pictureRouter = Router();

pictureRouter.get("/:id", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

pictureRouter.get("/user/:id/:page", getUserPicturesController);

export { pictureRouter };
