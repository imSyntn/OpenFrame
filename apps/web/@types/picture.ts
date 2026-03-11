import { Photo } from "react-photo-album";

export type GalleryPhoto = Photo & {
  blurhash: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};
