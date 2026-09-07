import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MyCollections, ShowUserCollections } from "./MyCollections";
import { useGetUserCollections } from "@/hooks";
import { useUserStore } from "@/store";

vi.mock("@/hooks", () => ({
  useGetUserCollections: vi.fn(),
}));

vi.mock("@/store", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useUserStore: vi.fn(),
  };
});

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("MyCollections Component", () => {
  it("renders login prompt when user is not logged in", () => {
    vi.mocked(useUserStore).mockImplementation((selector: any) =>
      selector({ isLoggedIn: false, id: null })
    );

    render(<MyCollections />);

    expect(
      screen.getByText("Please login to view/create your collections")
    ).toBeInTheDocument();
  });

  it("renders user collections when logged in", () => {
    vi.mocked(useUserStore).mockImplementation((selector: any) =>
      selector({ isLoggedIn: true, id: "user-123" })
    );

    vi.mocked(useGetUserCollections).mockReturnValue({
      data: {
        data: [
          {
            id: "col-1",
            title: "My Private Collection",
            items: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            creator: { name: "User 123", avatar: "" },
          },
        ],
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    render(<MyCollections />);

    expect(screen.getByText("My Private Collection")).toBeInTheDocument();
  });

  it("renders not found component when user has zero collections", () => {
    vi.mocked(useUserStore).mockImplementation((selector: any) =>
      selector({ isLoggedIn: true, id: "user-123" })
    );

    vi.mocked(useGetUserCollections).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    render(<ShowUserCollections id="user-123" />);

    expect(
      screen.getByText("You haven't created any collections yet.")
    ).toBeInTheDocument();
  });
});
