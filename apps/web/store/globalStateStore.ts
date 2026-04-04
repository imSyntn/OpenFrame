import { GlobalStateStore } from "@/@types";
import { create } from "zustand";

export const useGlobalStateStore = create<GlobalStateStore>((set) => ({
  open: false,
  image: null,
  openCollectionModal: null,
  setOpen: (open, image) => set({ open, image }),
  setOpenCollectionModal: (openCollectionModal) => set({ openCollectionModal }),
}));
