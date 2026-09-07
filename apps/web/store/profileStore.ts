import { ProfileStore } from "@/@types";
import { createStore } from "zustand/vanilla";

export const createProfileStore = () =>
  createStore<ProfileStore>()((set) => ({
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

    setData: (data) =>
      set({
        ...data,
        isLoading: false,
      }),
  }));
