import { ProfileStore } from "@/@types";
import { create } from "zustand";

export const useProfileStore = create<ProfileStore>((set) => ({
  isLoading: true,
  id: "",
  name: "",
  email: "",
  joined_at: "",
  avatar: "",
  bio: "",
  is_verified: false,
  location: "",
  _count: null,
  metrics: null,
  links: null,
  pictures: null,
  nextCursor: null,

  setData: (data) =>
    set({ ...data, nextCursor: data.pictures?.[data.pictures.length - 1]?.id }),
  addPictures: (data, nextCursor) =>
    set((state) => {
      if (!state.pictures)
        return { pictures: data, nextCursor: data[data.length - 1]?.id };
      return {
        pictures: [...state.pictures, ...data],
        nextCursor: nextCursor || data[data.length - 1]?.id,
      };
    }),
}));
