import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { copyToClipboard, getBlurImage, googleLoginHandler } from "./index";
import { toast } from "sonner";
import type { MouseEvent } from "react";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("apps/web/utils testing", () => {
  describe("copyToClipboard", () => {
    const originalClipboard = navigator.clipboard;

    beforeEach(() => {
      vi.clearAllMocks();
    });

    afterEach(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: originalClipboard,
        writable: true,
        configurable: true,
      });
    });

    it("copies text and displays default success toast", async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: writeTextMock },
        writable: true,
        configurable: true,
      });

      await copyToClipboard("hello world");

      expect(writeTextMock).toHaveBeenCalledWith("hello world");
      expect(toast.success).toHaveBeenCalledWith(
        "Successfully copied to clipboard.",
      );
    });

    it("copies text and displays custom success toast message", async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: writeTextMock },
        writable: true,
        configurable: true,
      });

      await copyToClipboard("https://openframe.dev", "URL Copied!");

      expect(writeTextMock).toHaveBeenCalledWith("https://openframe.dev");
      expect(toast.success).toHaveBeenCalledWith("URL Copied!");
    });

    it("handles clipboard error and displays error toast", async () => {
      const writeTextMock = vi
        .fn()
        .mockRejectedValue(new Error("Permission denied"));
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: writeTextMock },
        writable: true,
        configurable: true,
      });

      await copyToClipboard("failed text");

      expect(toast.error).toHaveBeenCalledWith("Failed to copy to clipboard.");
    });

    it("handles clipboard error and displays custom error toast", async () => {
      const writeTextMock = vi
        .fn()
        .mockRejectedValue(new Error("Permission denied"));
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: writeTextMock },
        writable: true,
        configurable: true,
      });

      await copyToClipboard("failed text", undefined, "Custom error!");

      expect(toast.error).toHaveBeenCalledWith("Custom error!");
    });
  });

  describe("googleLoginHandler", () => {
    it("prevents default event behavior and navigates to Google auth endpoint", () => {
      const originalLocation = window.location;
      // @ts-expect-error re-assigning location for testing
      delete window.location;
      // @ts-expect-error re-assigning location for testing
      window.location = {
        ...originalLocation,
        href: "",
      } as unknown as Location;

      const preventDefaultMock = vi.fn();
      const mockEvent = {
        preventDefault: preventDefaultMock,
      } as unknown as MouseEvent<HTMLButtonElement>;

      googleLoginHandler(mockEvent);

      expect(preventDefaultMock).toHaveBeenCalledOnce();
      expect(window.location.href).toContain("/user/google");

      // @ts-expect-error re-assigning location for testing
      window.location = originalLocation;
    });
  });
});
