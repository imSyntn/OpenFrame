import { PictureType } from "./picture";

export interface GlobalStateStore {
  open: boolean;
  image: PictureType | null;
  pictures: PictureType[];
  nextCursor: string;
  picturesLoading: boolean;
  setOpen: (open: boolean, image?: PictureType) => void;
  setPictures: (data: { pictures: PictureType[]; nextCursor?: string }) => void;
  setPicturesLoading: (picturesLoading: boolean) => void;
}
