import exifr from "exifr";
import { encode } from "blurhash";
import sharp from "sharp";

export const extractMetadata = async (imageBuffer: Buffer) => {
  const data = await exifr.parse(imageBuffer);
  return data;
};

export const getBlurHash = async (imageBuffer: Buffer) => {
  const { data, info } = await sharp(imageBuffer)
    .resize(32, 32, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const blurhash = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4,
  );

  return blurhash;
};
