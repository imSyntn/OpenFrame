import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CollectionImageCard } from "./CollectionImageCard";
import { useDeleteCollectionItems } from "@/hooks";
import type { CollectionItem } from "@workspace/types";

vi.mock("@/hooks", () => ({
  useDeleteCollectionItems: vi.fn().mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

const mockCollectionItem: CollectionItem = {
  collection_id: "col_123",
  pic_id: "pic_456",
  picture: {
    id: "pic_456",
    title: "Mountain Sunset",
    user_id: "user_1",
    src: [
      {
        resolution: "THUMBNAIL",
        url: "https://example.com/thumb.jpg",
        width: 400,
        height: 300,
        size: 20000,
      },
    ],
  },
} as unknown as CollectionItem;

describe("CollectionImageCard", () => {
  const deleteMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDeleteCollectionItems).mockReturnValue({
      mutateAsync: deleteMock,
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteCollectionItems>);
  });

  it("renders image thumbnail and link to picture page", () => {
    render(<CollectionImageCard item={mockCollectionItem} isOwner={false} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/picture/pic_456");

    const img = screen.getByAltText("Mountain Sunset");
    expect(img).toHaveAttribute("src", "https://example.com/thumb.jpg");
  });

  it("renders trash delete button when isOwner is true and handles deletion", async () => {
    const user = userEvent.setup();
    render(<CollectionImageCard item={mockCollectionItem} isOwner={true} />);

    const deleteBtn = screen.getByRole("button");
    expect(deleteBtn).toBeInTheDocument();

    await user.click(deleteBtn);

    expect(deleteMock).toHaveBeenCalledWith({
      id: "col_123",
      pic_ids: ["pic_456"],
    });
  });
});
