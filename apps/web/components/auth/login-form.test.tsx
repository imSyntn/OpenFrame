import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./login-form";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { googleLoginHandler } from "@/utils";
import { useUserStore } from "@/store";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    loading: vi.fn().mockReturnValue("toast-id"),
    dismiss: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/hooks", () => ({
  useLogin: vi.fn(),
  useOTPGenerate: vi.fn().mockReturnValue({ mutateAsync: vi.fn() }),
  useOTPVerify: vi.fn().mockReturnValue({ mutateAsync: vi.fn() }),
  useChangePassword: vi.fn().mockReturnValue({ mutateAsync: vi.fn() }),
}));

vi.mock("@/utils", () => ({
  googleLoginHandler: vi.fn(),
  copyToClipboard: vi.fn(),
  getBlurImage: vi.fn(),
}));

describe("LoginForm Test", () => {
  const pushMock = vi.fn();
  const mutateAsyncMock = vi.fn();

  beforeEach(() => {
    useUserStore.setState({ isLoggedIn: false });
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as ReturnType<typeof useRouter>);

    vi.mocked(useLogin).mockReturnValue({
      mutateAsync: mutateAsyncMock,
    } as unknown as ReturnType<typeof useLogin>);
  });

  it("renders form elements properly", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: /login to your account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^login$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login with google/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
  });

  it("won't submit for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /^login$/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mutateAsyncMock).not.toHaveBeenCalled();
    });
  });

  it("submits form with valid user inputs and calls mutateAsync", async () => {
    const user = userEvent.setup();
    mutateAsyncMock.mockResolvedValueOnce({
      data: {
        data: {
          id: "user_1",
          email: "test@example.com",
          name: "Test User",
          avatar: "https://example.com/avatar.png",
        },
      },
    });

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /^login$/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123!");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password123!",
      });
    });
  });

  it("triggers googleLoginHandler when clicking Google login button", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const googleButton = screen.getByRole("button", {
      name: /login with google/i,
    });
    await user.click(googleButton);

    expect(googleLoginHandler).toHaveBeenCalled();
  });
});
