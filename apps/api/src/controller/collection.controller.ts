import { NextFunction, Request, Response } from "express";
import {
  getCollections,
  getCollectionById,
  createCollection,
  deleteCollection,
  addCollectionItems,
  removeCollectionItems,
  updateCollection,
  getUserCollections,
} from "@/service";
import {
  collectionItemSchema,
  collectionSchema,
  collectionUpdateSchema,
} from "@/schema";
import { ErrorWithStatus } from "@/middleware";

export const getCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const collections = await getCollections();
    return res.status(200).json({
      data: collections,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("api hit controller");
    const { userId } = req.params;
    const loggedInUserId = req.user?.id || "";
    if (!userId) {
      return next(new ErrorWithStatus(400, "User id is required"));
    }
    const isOwner = loggedInUserId === userId;

    const collections = await getUserCollections(userId as string, isOwner);
    return res.status(200).json({
      data: collections,
    });
  } catch (error) {
    next(error);
  }
};

export const getCollectionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorWithStatus(400, "Collection ID is required"));
    }

    const loggedInUserId = req.user?.id || "";
    const isOwner = loggedInUserId === id;

    const collection = await getCollectionById(id as string, isOwner);
    if (!collection) {
      return next(new ErrorWithStatus(404, "Collection not found"));
    }
    return res.status(200).json({ data: collection });
  } catch (error) {
    next(error);
  }
};

export const createCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const { title, visibility, description } = collectionSchema.parse(data);

    const { id: creator_id } = req.user as { id: string };

    const collection = await createCollection({
      title,
      description: description || "",
      visibility,
      creator_id,
    });
    return res
      .status(201)
      .json({ message: "Collection created successfully", data: collection });
  } catch (error) {
    next(error);
  }
};

export const updateCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const { id: collection_id } = req.params;

    const parsedData = collectionUpdateSchema.parse(data);

    const collection = await updateCollection(
      collection_id as string,
      parsedData,
    );
    return res
      .status(201)
      .json({ message: "Collection updated successfully", data: collection });
  } catch (error) {
    next(error);
  }
};

export const addCollectionItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { items } = req.body;
    const { id: collection_id } = req.params;

    const parsedData = collectionItemSchema.parse(items);

    const updates: {
      collection_id: string;
      pic_id: string;
    }[] = parsedData.map((pic_id) => ({
      pic_id,
      collection_id: collection_id as string,
    }));

    const collection = await addCollectionItems(updates);
    return res
      .status(201)
      .json({ message: "Items added successfully", data: collection });
  } catch (error) {
    next(error);
  }
};

export const removeCollectionItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { items } = req.body;
    const { id: collection_id } = req.params;

    const parsedData = collectionItemSchema.parse(items);

    const collection = await removeCollectionItems(
      collection_id as string,
      parsedData,
    );
    return res
      .status(200)
      .json({ message: "Items removed successfully", data: collection });
  } catch (error) {
    next(error);
  }
};

export const deleteCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Collection ID is required" });
    }
    const collection = await deleteCollection(id as string);
    return res
      .status(200)
      .json({ message: "Collection deleted successfully", data: collection });
  } catch (error) {
    next(error);
  }
};
