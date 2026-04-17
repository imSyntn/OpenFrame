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
  checkOwner,
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
  checkOwner,
  updateCollectionController,
);
collectionRouter.delete(
  "/:id",
  collectionLimiter,
  authMiddleware,
  checkOwner,
  deleteCollectionController,
);

collectionRouter.post(
  "/:id/items",
  collectionLimiter,
  authMiddleware,
  checkOwner,
  addCollectionItemsController,
);
collectionRouter.delete(
  "/:id/items",
  collectionLimiter,
  authMiddleware,
  checkOwner,
  removeCollectionItemsController,
);

export { collectionRouter };
