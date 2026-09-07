import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AllCollections } from "./AllCollections";
import { useGetCollections } from "@/hooks";

vi.mock("@/hooks", () => ({
  useGetCollections: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("AllCollections Component", () => {
  it("renders error state when fetch fails", () => {
    const mockRefetch = vi.fn();
    vi.mocked(useGetCollections).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { response: { data: { message: "Failed to fetch collections" } } },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: mockRefetch,
    } as any);

    render(<AllCollections />);

    expect(screen.getByText("Failed to fetch collections")).toBeInTheDocument();
  });

  it("renders empty/not found state when collections array is empty", () => {
    vi.mocked(useGetCollections).mockReturnValue({
      data: { pages: [{ data: [] }] },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    } as any);

    render(<AllCollections />);

    expect(screen.getByText("No collections found")).toBeInTheDocument();
  });

  it("renders collections list and handles load more button click", () => {
    const mockFetchNextPage = vi.fn();
    vi.mocked(useGetCollections).mockReturnValue({
      data: {
        pages: [
          {
            data: [
              {
                id: "col-1",
                title: "Nature",
                items: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator: { name: "John Doe", avatar: "" },
              },
              {
                id: "col-2",
                title: "Architecture",
                items: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator: { name: "Jane Smith", avatar: "" },
              },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    } as any);

    render(<AllCollections />);

    expect(screen.getByText("Nature")).toBeInTheDocument();
    expect(screen.getByText("Architecture")).toBeInTheDocument();

    const loadMoreButton = screen.getByRole("button", { name: "Load more" });
    expect(loadMoreButton).not.toBeDisabled();

    fireEvent.click(loadMoreButton);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });
});
