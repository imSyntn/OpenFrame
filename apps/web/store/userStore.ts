import { create } from "zustand";

interface UserStore {
  isLoggedIn: boolean;
  email: string;
  id: string;
  name: string;
  avatar: string;
  setUser: (data: any) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  email: "",
  id: "",
  name: "",
  avatar: "",

  setUser: (data: any) => set({ ...data }),
}));
