import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(document, "elementFromPoint", {
  configurable: true,
  value: vi.fn(() => null),
});

globalThis.ResizeObserver = ResizeObserverMock;

vi.mock("react-responsive-masonry", () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
  ResponsiveMasonry: ({ children }: { children: React.ReactNode }) => children,
}));
