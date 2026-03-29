import { GlobalStateStore } from "@/@types";
import { create } from "zustand";

export const useGlobalStateStore = create<GlobalStateStore>((set) => ({
  open: false,
  image: null,
  pictures: [],
  nextCursor: "",
  picturesLoading: true,
  setOpen: (open, image) => set({ open, image }),
  setPictures: (data) => {
    set(() => ({
      pictures: data.pictures,
      nextCursor: data.nextCursor || "",
    }));
  },
  setPicturesLoading: (picturesLoading) => set({ picturesLoading }),
}));
