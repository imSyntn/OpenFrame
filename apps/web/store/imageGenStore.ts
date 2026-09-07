import { createStore } from "zustand/vanilla";
import type { GenerationResult } from "@/@types";

type GenerationStatus = "idle" | "generating" | "success" | "error";

type ImageGenerationState = {
  status: GenerationStatus;
  currentResult: GenerationResult | null;
  error: string | null;
};

type ImageGenerationActions = {
  setStatus: (status: GenerationStatus) => void;
  setCurrentResult: (result: GenerationResult | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

export type ImageGenerationStore = ImageGenerationState &
  ImageGenerationActions;

export const createImageGenerationStore = () =>
  createStore<ImageGenerationStore>()((set) => ({
    status: "idle",
    currentResult: null,
    error: null,

    setStatus: (status) => set({ status }),
    setCurrentResult: (currentResult) => set({ currentResult }),
    setError: (error) => set({ error }),
    reset: () =>
      set({
        status: "idle",
        currentResult: null,
      }),
  }));
