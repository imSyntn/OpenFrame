import exifr from "exifr";

export const extractMetadata = async (url: string) => {
  const data = await exifr.parse(url);
  return data;
};
