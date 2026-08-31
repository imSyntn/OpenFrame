"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import {
  createImageGenerationStore,
  type ImageGenerationStore,
} from "@/store/imageGenStore";

type ImageGenerationStoreApi = ReturnType<typeof createImageGenerationStore>;

const ImageGenerationContext = createContext<ImageGenerationStoreApi | null>(
  null,
);

export function ImageGenerationProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<ImageGenerationStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createImageGenerationStore();
  }

  return (
    <ImageGenerationContext.Provider value={storeRef.current}>
      {children}
    </ImageGenerationContext.Provider>
  );
}

export function useImageGenerationStore<T>(
  selector: (state: ImageGenerationStore) => T,
): T {
  const store = useContext(ImageGenerationContext);

  if (!store) {
    throw new Error(
      "useImageGenerationStore must be used within ImageGenerationProvider",
    );
  }

  return useStore(store, selector);
}
