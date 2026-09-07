import { describe, it, expect } from "vitest";
import { createImageGenerationStore } from "./imageGenStore";
import type { GenerationResult } from "@/@types";

describe("imageGenStore test", () => {
  it("initializes with default state", () => {
    const store = createImageGenerationStore();
    const state = store.getState();

    expect(state.status).toBe("idle");
    expect(state.currentResult).toBeNull();
    expect(state.error).toBeNull();
  });

  it("updates status via setStatus action", () => {
    const store = createImageGenerationStore();

    store.getState().setStatus("generating");
    expect(store.getState().status).toBe("generating");

    store.getState().setStatus("success");
    expect(store.getState().status).toBe("success");
  });

  it("updates currentResult via setCurrentResult action", () => {
    const store = createImageGenerationStore();
    const mockResult = {
      id: "img_123",
      imageUrl: "https://example.com/image.png",
      prompt: "A beautiful scenery",
    } as unknown as GenerationResult;

    store.getState().setCurrentResult(mockResult);
    expect(store.getState().currentResult).toEqual(mockResult);
  });

  it("updates error state via setError action", () => {
    const store = createImageGenerationStore();

    store.getState().setError("Failed to generate image");
    expect(store.getState().error).toBe("Failed to generate image");
  });

  it("resets status and currentResult when reset is called", () => {
    const store = createImageGenerationStore();
    const mockResult = { id: "img_123" } as unknown as GenerationResult;

    store.getState().setStatus("success");
    store.getState().setCurrentResult(mockResult);
    store.getState().setError("Previous warning");

    store.getState().reset();

    expect(store.getState().status).toBe("idle");
    expect(store.getState().currentResult).toBeNull();
  });
});
