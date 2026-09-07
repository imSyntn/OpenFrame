import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShowContent } from "./ShowContent";
import { useGetPictureById } from "@/hooks";
import { toast } from "sonner";

const mockPicture = {
  id: "pic_123",
  title: "Sunset over Mountains",
  description: "A beautiful mountain sunset",
  user_id: "user_1",
  license: "CC0_1_0",
  created_at: "2026-01-01T00:00:00.000Z",
  engagement: { likes: 10, views: 100, downloads: 5 },
  tags: [{ tag: { id: 1, name: "nature" } }],
  metadata: {
    dominant_color: "#ff0000",
    blurhash: "L6PZf-ayf6ay~qj[ayj[ayj[ayj[",
    palette: ["#ff0000"],
    others: {},
  },
  src: [
    {
      resolution: "ORIGINAL",
      url: "https://example.com/orig.jpg",
      width: 1920,
      height: 1080,
      size: 2048000,
    },
  ],
  user: {
    id: "user_1",
    name: "Test User",
    avatar: "https://example.com/avatar.jpg",
  },
};

vi.mock("react-responsive-masonry", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ResponsiveMasonry: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@workspace/ui/components/tooltip", () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
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

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => <div>Not Found Page</div>),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/hooks", () => ({
  useGetPictureById: vi.fn(),
  useUserDetails: vi.fn().mockReturnValue({
    data: { data: { id: "user_1", name: "Test User", avatar: "" } },
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  }),
  useIncrementViewCount: vi
    .fn()
    .mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}) }),
  useIncrementLikeCount: vi.fn().mockReturnValue({ mutate: vi.fn() }),
  useDeletePicture: vi
    .fn()
    .mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}) }),
  useGetUser: vi.fn().mockReturnValue({
    data: { data: { id: "user_1", name: "Test User" } },
    isLoading: false,
  }),
  useGetUserCollections: vi.fn().mockReturnValue({
    data: { data: [] },
    isLoading: false,
  }),
  useAddPictureToCollection: vi
    .fn()
    .mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}) }),
  useAddCollectionItems: vi
    .fn()
    .mockReturnValue({ mutate: vi.fn(), mutateAsync: vi.fn().mockResolvedValue({}) }),
  useCreateCollection: vi
    .fn()
    .mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}) }),
  useDownloadPicture: vi
    .fn()
    .mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}) }),
  useIncrementDownloadCount: vi
    .fn()
    .mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}) }),
}));

describe("ShowContent", () => {
  const refetchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders skeleton loader when picture is loading", () => {
    vi.mocked(useGetPictureById).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: refetchMock,
    } as unknown as ReturnType<typeof useGetPictureById>);

    const { container } = render(<ShowContent pictureId="pic_123" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders ErrorOccured and triggers toast error when fetch fails", async () => {
    const user = userEvent.setup();
    vi.mocked(useGetPictureById).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { response: { data: { message: "Picture not found" } } },
      refetch: refetchMock,
    } as unknown as ReturnType<typeof useGetPictureById>);

    render(<ShowContent pictureId="pic_123" />);

    expect(toast.error).toHaveBeenCalledWith("Failed to fetch picture");
    expect(
      screen.getByRole("heading", { name: "Picture not found" }),
    ).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: "Retry" });
    await user.click(retryBtn);
    expect(refetchMock).toHaveBeenCalled();
  });

  it("renders Content component when picture data is successfully loaded", () => {
    vi.mocked(useGetPictureById).mockReturnValue({
      data: { data: mockPicture },
      isLoading: false,
      isError: false,
      error: null,
      refetch: refetchMock,
    } as unknown as ReturnType<typeof useGetPictureById>);

    render(<ShowContent pictureId="pic_123" />);

    expect(screen.getByText("Sunset over Mountains")).toBeInTheDocument();
  });
});
