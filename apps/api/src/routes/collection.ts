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
import {
  authMiddleware,
  checkCollectionOwner,
  collectionLimiter,
  getIfUserIsLoggedIn,
} from "@/middleware";

const collectionRouter = Router();

collectionRouter.get("/", getCollectionController);
collectionRouter.get(
  "/user/:userId",
  getIfUserIsLoggedIn,
  getUserCollectionController,
);
collectionRouter.get("/:id", getIfUserIsLoggedIn, getCollectionByIdController);
collectionRouter.post(
  "/",
  collectionLimiter,
  authMiddleware,
  createCollectionController,
);
collectionRouter.patch(
  "/:id",
  collectionLimiter,
  authMiddleware,
  checkCollectionOwner,
  updateCollectionController,
);
collectionRouter.delete(
  "/:id",
  collectionLimiter,
  authMiddleware,
  checkCollectionOwner,
  deleteCollectionController,
);

collectionRouter.post(
  "/:id/items",
  collectionLimiter,
  authMiddleware,
  checkCollectionOwner,
  addCollectionItemsController,
);
collectionRouter.delete(
  "/:id/items",
  collectionLimiter,
  authMiddleware,
  checkCollectionOwner,
  removeCollectionItemsController,
);

export { collectionRouter };
