"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { useStore } from "zustand";
import { ProfileStore } from "@/@types";
import { createProfileStore } from "@/store";

type ProfileStoreApi = ReturnType<typeof createProfileStore>;

const ProfileContext = createContext<ProfileStoreApi | null>(null);

type ProfileProviderProps = {
  children: ReactNode;
  initialData?: Partial<ProfileStore>;
};

export function ProfileProvider({
  children,
  initialData,
}: ProfileProviderProps) {
  const [store] = useState(() => {
    const s = createProfileStore();
    if (initialData) {
      s.setState({
        ...initialData,
        isLoading: false,
      });
    }
    return s;
  });

  return (
    <ProfileContext.Provider value={store}>{children}</ProfileContext.Provider>
  );
}

export function useProfileStore<T>(selector: (state: ProfileStore) => T): T {
  const store = useContext(ProfileContext);

  if (!store) {
    throw new Error("useProfileStore must be used within ProfileProvider");
  }

  return useStore(store, selector);
}
