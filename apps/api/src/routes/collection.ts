import { Router } from "express";
import {
  getCollectionController,
  createCollectionController,
  updateCollectionController,
  deleteCollectionController,
  getCollectionByIdController,
  addCollectionItemsController,
  removeCollectionItemsController,
} from "@/controller";
import { authMiddleware, checkOwner } from "@/middleware";

const collectionRouter = Router();

collectionRouter.get("/", getCollectionController);
collectionRouter.get("/:id", getCollectionByIdController);
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
