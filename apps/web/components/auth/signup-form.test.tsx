import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./signup-form";
import { useSignUp } from "@/hooks";
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
  useSignUp: vi.fn(),
}));

vi.mock("@/utils", () => ({
  googleLoginHandler: vi.fn(),
  copyToClipboard: vi.fn(),
  getBlurImage: vi.fn(),
}));

describe("SignupForm Test", () => {
  const pushMock = vi.fn();
  const mockedMutateAsync = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({ isLoggedIn: false });
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as ReturnType<typeof useRouter>);
    vi.mocked(useSignUp).mockReturnValue({
      mutateAsync: mockedMutateAsync,
    } as unknown as ReturnType<typeof useSignUp>);
  });

  it("renders form elements properly", () => {
    render(<SignupForm />);

    expect(
      screen.getByRole("heading", { name: /Create your account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^create account$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign up with Google/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign in/i })).toBeInTheDocument();
  });

  it("won't submit for invalid email", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "invalid-email");

    const btn = screen.getByRole("button", { name: /^create account$/i });

    await user.click(btn);

    await waitFor(() => {
      expect(mockedMutateAsync).not.toHaveBeenCalled();
    });
  });

  it("submits form with valid user inputs and calls mutateAsync", async () => {
    const user = userEvent.setup();
    mockedMutateAsync.mockResolvedValueOnce({
      data: {
        data: {
          id: "user_1",
          email: "test@example.com",
          name: "Test User",
          avatar: "https://example.com/avatar.png",
        },
      },
    });

    render(<SignupForm />);

    const fullNameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", {
      name: /^create account$/i,
    });

    await user.type(fullNameInput, "Test User");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123!");
    await user.type(confirmPasswordInput, "Password123!");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockedMutateAsync).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      });
    });
  });

  it("triggers googleLoginHandler when clicking Google login button", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    const googleButton = screen.getByRole("button", {
      name: /Sign up with Google/i,
    });
    await user.click(googleButton);

    expect(googleLoginHandler).toHaveBeenCalled();
  });
});
