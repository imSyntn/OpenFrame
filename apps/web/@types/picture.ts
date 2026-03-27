import { tagsType } from "@workspace/types";
import { Photo } from "react-photo-album";

export interface PictureType {
  id: string;
  title: string;
  alt: string;
  description: string;
  created_at: string;

  user: {
    id: string;
    name: string;
    avatar: string;
  };

  src: {
    resolution: "SMALL" | "MEDIUM" | "LARGE" | "ORIGINAL" | "THUMBNAIL";
    url: string;
    type: "JPG" | "PNG" | "WEBP";
    width?: number;
    height?: number;
    size: number;
  }[];

  metadata: {
    blurhash: string;
    dominantColor: string;
    others?: Record<string, string>;
  };

  tags: string[] | { tag: tagsType }[];
}

export type GalleryPhoto = Photo & {
  blurhash: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};
