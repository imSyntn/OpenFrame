import { GlobalStateStore } from "@/@types";
import { create } from "zustand";

export const useGlobalStateStore = create<GlobalStateStore>((set) => ({
  open: false,
  image: null,
  setOpen: (open, image) => set({ open, image }),
}));
