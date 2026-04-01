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
    dominant_color: string;
    others?: Record<string, string>;
  };

  tags: string[] | { tag: tagsType }[];
  user_id: string;
  _count: {
    likes: number;
  };
  engagement: {
    views: number;
    downloads: number;
    likes: number;
  };
}

export type GalleryPhoto = Photo & {
  blurhash: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};
