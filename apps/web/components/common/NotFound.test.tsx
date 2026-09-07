import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NotFound } from "./NotFound";
import { FileX } from "lucide-react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("NotFound Component", () => {
  it("renders title, description and links", () => {
    render(
      <NotFound
        Icon={FileX}
        title="Custom Not Found Title"
        description="Custom Not Found Description"
      />
    );

    expect(screen.getByText("Custom Not Found Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Not Found Description")).toBeInTheDocument();
    expect(screen.getByText("Go home")).toBeInTheDocument();
    expect(screen.getByText("Explore photos")).toBeInTheDocument();
  });
});
