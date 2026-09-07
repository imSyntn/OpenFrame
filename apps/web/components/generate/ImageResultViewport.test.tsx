import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImageResultViewport } from "./ImageResultViewport";
import { useImageGenerationStore } from "../Provider";

vi.mock("../Provider", () => ({
  useImageGenerationStore: vi.fn(),
}));

describe("ImageResultViewport", () => {
  it("renders idle view when status is idle", () => {
    vi.mocked(useImageGenerationStore).mockImplementation((selector) =>
      selector({
        status: "idle",
        currentResult: null,
      } as unknown as Parameters<typeof selector>[0]),
    );

    render(<ImageResultViewport />);
    expect(
      screen.getByRole("heading", { name: /Your AI Canvas Awaits/i }),
    ).toBeInTheDocument();
  });

  it("renders generating view when status is generating", () => {
    vi.mocked(useImageGenerationStore).mockImplementation((selector) =>
      selector({
        status: "generating",
        currentResult: null,
      } as unknown as Parameters<typeof selector>[0]),
    );

    render(<ImageResultViewport />);
    expect(
      screen.getByRole("heading", { name: /Generating AI Image/i }),
    ).toBeInTheDocument();
  });

  it("renders result and metadata views when status is success", () => {
    vi.mocked(useImageGenerationStore).mockImplementation((selector) =>
      selector({
        status: "success",
        currentResult: {
          id: "res_123",
          image: "R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=",
          prompt: "A cyberpunk city",
          styleName: "Cinematic",
          model: "standard",
          public: false,
          createdAt: new Date().toISOString(),
        },
      } as unknown as Parameters<typeof selector>[0]),
    );

    render(<ImageResultViewport />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "data:image/png;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=",
    );
  });

  it("renders error view when status is error", () => {
    vi.mocked(useImageGenerationStore).mockImplementation((selector) =>
      selector({
        status: "error",
      } as unknown as Parameters<typeof selector>[0]),
    );

    render(<ImageResultViewport />);
    expect(
      screen.getByRole("heading", { name: /Generation Failed/i }),
    ).toBeInTheDocument();
  });

  it("clears generation when error button is clicked", () => {
    const mockReset = vi.fn();
    vi.mocked(useImageGenerationStore).mockImplementation((selector) =>
      selector({
        status: "error",
        error: "Test error",
        reset: mockReset,
      } as unknown as Parameters<typeof selector>[0]),
    );

    render(<ImageResultViewport />);
    screen.getByRole("button", { name: /Try Again/i }).click();
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
