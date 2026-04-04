import { Collection } from "@workspace/types";
import { PictureType } from "./picture";

export interface GlobalStateStore {
  open: boolean;
  image: PictureType | null;
  openCollectionModal: null | Collection;
  setOpen: (open: boolean, image?: PictureType) => void;
  setOpenCollectionModal: (openCollectionModal: null | Collection) => void;
}
