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

  setData: (data) => set({ ...data }),
}));
