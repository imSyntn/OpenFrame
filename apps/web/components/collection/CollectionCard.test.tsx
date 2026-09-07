import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CollectionCard } from "./CollectionCard";
import type { Collection } from "@workspace/types";
import { useGlobalStateStore } from "@/store";

const mockCollection: Collection = {
  id: "col_100",
  title: "Nature Photography",
  description: "Collection of forest and mountain photos",
  visibility: "PUBLIC",
  cover_image: "https://example.com/cover.jpg",
  created_at: "2024-01-01T00:00:00.000Z",
  updated_at: "2024-01-02T00:00:00.000Z",
  creator_id: "creator_1",
  creator: {
    id: "creator_1",
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
  },
  items: [],
} as unknown as Collection;

describe("CollectionCard", () => {
  it("renders collection title, description, cover image, and creator info", () => {
    render(<CollectionCard collection={mockCollection} />);

    expect(screen.getByText("Nature Photography")).toBeInTheDocument();
    expect(
      screen.getByText("Collection of forest and mountain photos"),
    ).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    const coverImg = screen.getByAltText("Nature Photography");
    expect(coverImg).toHaveAttribute("src", "https://example.com/cover.jpg");
  });

  it("triggers setOpenCollectionModal when card is clicked", async () => {
    const user = userEvent.setup();
    const setOpenCollectionModalSpy = vi.spyOn(
      useGlobalStateStore.getState(),
      "setOpenCollectionModal",
    );

    render(<CollectionCard collection={mockCollection} />);

    const card = screen.getByText("Nature Photography").closest("div");
    if (card) {
      await user.click(card);
    }

    expect(setOpenCollectionModalSpy).toHaveBeenCalledWith(mockCollection);
  });
});
