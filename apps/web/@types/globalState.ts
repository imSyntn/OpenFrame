import { PictureType } from "./picture";

export interface GlobalStateStore {
  open: boolean;
  image: PictureType | null;
  setOpen: (open: boolean, image?: PictureType) => void;
}
