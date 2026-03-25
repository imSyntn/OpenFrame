import { RESOLUTION_MAP } from "@workspace/constants";
import sharp from "sharp";

export const resizeImage = async (url: string) => {
  const image = await fetch(url);
  const buffer = Buffer.from(await image.arrayBuffer());

  const metadata = await sharp(buffer).metadata();
  const { width, height } = metadata;

  if (!width || !height) throw new Error("Invalid image");

  const original = {
    resolution: "ORIGINAL",
    url,
    size: buffer.length,
    width,
    height,
  };

  const availableResolutions = Object.entries(RESOLUTION_MAP).filter(
    ([_, value]) => typeof value === "number" && value < width,
  );

  const results = await Promise.all(
    availableResolutions.map(async ([key, value]) => {
      const { data, info } = await sharp(buffer)
        .resize({
          width: value as number,
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80 })
        .toBuffer({ resolveWithObject: true });

      return {
        resolution: key,
        size: data.length,
        width: info.width,
        height: info.height,
        buffer: data,
      };
    }),
  );

  return {
    original,
    variants: results,
  };
};
