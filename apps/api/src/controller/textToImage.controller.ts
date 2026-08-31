import { createImage, createPicture, getPictureUploadUrl } from "@/service";
import { extractTitleAndTagsFromPrompt } from "@/utils";
import { ImageGenerateSchema } from "@workspace/schema/index";
import type { NextFunction, Request, Response } from "express";
import { string } from "zod/v4";

export const createImageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const validatedBody = ImageGenerateSchema.parse(body);
    const result = await createImage(validatedBody);
    let imageId = "";

    if (validatedBody.public) {
      const base64Image = result.data[0].b64_json;
      const imageBuffer = Buffer.from(base64Image, "base64");
      const { id: userID } = req.user as { id: string };

      const { uploadUrl, fileUrl, id } = await getPictureUploadUrl(
        "image/png",
        imageBuffer.length,
        false,
        "generated",
        "gen",
      );

      imageId = id;

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "image/png",
        },
        body: imageBuffer,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload generated image");
      }

      const { title, tags } = extractTitleAndTagsFromPrompt(
        validatedBody.prompt,
      );

      await createPicture(
        title,
        validatedBody.prompt,
        tags,
        fileUrl,
        userID,
        id,
      );
    }

    return res.status(200).json({
      message: "OK",
      data: {
        id: !!imageId ? imageId : crypto.randomUUID(),
        prompt: validatedBody.prompt,
        negativePrompt: validatedBody.negPrompt,
        styleName: validatedBody.artStyle,
        model: validatedBody.model,
        public: validatedBody.public,
        image: result.data[0].b64_json,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return next(error);
  }
};
