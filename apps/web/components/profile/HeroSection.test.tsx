import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";
import { useUserDetails } from "@/hooks";
import { useUserStore } from "@/store";
import { useProfileStore } from "../Provider";

vi.mock("@workspace/ui/components/tooltip", () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  TooltipContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/hooks", () => ({
  useUserDetails: vi.fn(),
}));

vi.mock("../Provider", () => ({
  useProfileStore: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("Profile HeroSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({ id: "logged_in_user_1" });
    vi.mocked(useProfileStore).mockReturnValue({
      setData: vi.fn(),
      avatar: "https://example.com/avatar.jpg",
      name: "Sarah Connor",
      location: "Los Angeles, CA",
      bio: "Software developer and photography enthusiast",
      links: [],
      email: "sarah@example.com",
      is_verified: true,
      metrics: { total_downloads: 500 },
    });
  });

  it("renders profile skeleton when user details are loading", () => {
    vi.mocked(useUserDetails).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useUserDetails>);

    const { container } = render(<HeroSection id="user_123" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders profile avatar, name, location, and bio when data is loaded", () => {
    vi.mocked(useUserDetails).mockReturnValue({
      data: {
        id: "user_123",
        name: "Sarah Connor",
        avatar: "https://example.com/avatar.jpg",
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useUserDetails>);

    render(<HeroSection id="user_123" />);

    expect(
      screen.getByRole("heading", { name: "Sarah Connor" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Los Angeles, CA")).toBeInTheDocument();
    expect(
      screen.getByText("Software developer and photography enthusiast"),
    ).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });
});
