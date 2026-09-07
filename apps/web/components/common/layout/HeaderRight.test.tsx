import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeaderRight } from "./HeaderRight";
import { useUserStore } from "@/store";
import { useRefreshToken, useLogout } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock("@/hooks", () => ({
  useRefreshToken: vi.fn(),
  useLogout: vi.fn().mockReturnValue({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("@/components/ThemeToggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

describe("HeaderRight", () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({
      isLoggedIn: false,
      id: "",
      name: "",
      email: "",
      avatar: "",
      accessToken: "",
    });

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      replace: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockReturnValue(null),
      toString: vi.fn().mockReturnValue(""),
    } as unknown as ReturnType<typeof useSearchParams>);

    vi.mocked(useRefreshToken).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useRefreshToken>);
  });

  it("renders Login and Signup buttons when user is not logged in", () => {
    render(<HeaderRight />);

    const loginBtns = screen.getAllByRole("button", { name: /login/i });
    const signupBtns = screen.getAllByRole("button", { name: /signup/i });

    expect(loginBtns.length).toBeGreaterThan(0);
    expect(signupBtns.length).toBeGreaterThan(0);
  });

  it("navigates to login page when Login button is clicked", async () => {
    const user = userEvent.setup();
    render(<HeaderRight />);

    const loginBtn = screen.getAllByRole("button", { name: /login/i })[0];
    if (loginBtn) {
      await user.click(loginBtn);
    }

    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("renders Submit Photo button and avatar dropdown when user is logged in", () => {
    useUserStore.setState({
      isLoggedIn: true,
      id: "user_1",
      name: "John Doe",
      avatar: "https://example.com/avatar.png",
    });

    render(<HeaderRight />);

    expect(
      screen.getByRole("button", { name: /submit photo/i }),
    ).toBeInTheDocument();
  });
});
