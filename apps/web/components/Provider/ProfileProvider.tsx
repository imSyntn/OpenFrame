"use client";

import { createContext, ReactNode, useContext, useRef } from "react";

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
  const storeRef = useRef<ProfileStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createProfileStore();

    if (initialData) {
      storeRef.current.setState({
        ...initialData,
        isLoading: false,
      });
    }
  }

  return (
    <ProfileContext.Provider value={storeRef.current}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileStore<T>(selector: (state: ProfileStore) => T): T {
  const store = useContext(ProfileContext);

  if (!store) {
    throw new Error("useProfileStore must be used within ProfileProvider");
  }

  return useStore(store, selector);
}
