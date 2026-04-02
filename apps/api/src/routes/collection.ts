import { Router } from "express";
import {
  getCollectionController,
  createCollectionController,
  updateCollectionController,
  deleteCollectionController,
  getCollectionByIdController,
  addCollectionItemsController,
  removeCollectionItemsController,
  getUserCollectionController,
} from "@/controller";
import { authMiddleware, checkOwner, getIfUserIsLoggedIn } from "@/middleware";

const collectionRouter = Router();

collectionRouter.get("/", getCollectionController);
collectionRouter.get(
  "/user/:userId",
  getIfUserIsLoggedIn,
  getUserCollectionController,
);
collectionRouter.get("/:id", getIfUserIsLoggedIn, getCollectionByIdController);
collectionRouter.post("/", authMiddleware, createCollectionController);
collectionRouter.patch(
  "/:id",
  authMiddleware,
  checkOwner,
  updateCollectionController,
);
collectionRouter.delete(
  "/:id",
  authMiddleware,
  checkOwner,
  deleteCollectionController,
);

collectionRouter.post(
  "/:id/items",
  authMiddleware,
  checkOwner,
  addCollectionItemsController,
);
collectionRouter.delete(
  "/:id/items",
  authMiddleware,
  checkOwner,
  removeCollectionItemsController,
);

export { collectionRouter };
