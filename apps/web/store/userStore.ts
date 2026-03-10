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
  avatar: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",

  setUser: (data: any) => set({ ...data }),
}));
