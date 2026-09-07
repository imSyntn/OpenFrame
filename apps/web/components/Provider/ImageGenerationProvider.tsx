"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
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
  const [store] = useState(() => createImageGenerationStore());

  return (
    <ImageGenerationContext.Provider value={store}>
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
