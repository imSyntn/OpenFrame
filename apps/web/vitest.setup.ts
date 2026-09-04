import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

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
