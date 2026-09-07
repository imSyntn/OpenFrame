import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ForgotPassword } from "./ForgotPassword";
import { useChangePassword, useOTPGenerate, useOTPVerify } from "@/hooks";
import { toast } from "sonner";

vi.mock("@/hooks", () => ({
  useOTPGenerate: vi.fn(),
  useOTPVerify: vi.fn(),
  useChangePassword: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ForgotPassword Test", () => {
  const generateOTPMock = vi.fn();
  const verifyOTPMock = vi.fn();
  const changePasswordMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useOTPGenerate).mockReturnValue({
      mutateAsync: generateOTPMock,
    } as unknown as ReturnType<typeof useOTPGenerate>);

    vi.mocked(useOTPVerify).mockReturnValue({
      mutateAsync: verifyOTPMock,
    } as unknown as ReturnType<typeof useOTPVerify>);

    vi.mocked(useChangePassword).mockReturnValue({
      mutateAsync: changePasswordMock,
    } as unknown as ReturnType<typeof useChangePassword>);
  });

  it("renders trigger button and opens modal on click", async () => {
    const user = userEvent.setup();
    render(<ForgotPassword />);

    const triggerButton = screen.getByRole("button", {
      name: /forgot your password\?/i,
    });
    expect(triggerButton).toBeInTheDocument();

    expect(screen.queryByText(/reset your password/i)).not.toBeInTheDocument();

    await user.click(triggerButton);

    expect(screen.getByText(/reset your password/i)).toBeInTheDocument();
    expect(
      screen.getByText(/enter the email linked to your account/i),
    ).toBeInTheDocument();
  });

  it("shows validation error on Step 0 if email is invalid", async () => {
    const user = userEvent.setup();
    render(<ForgotPassword />);

    await user.click(
      screen.getByRole("button", { name: /forgot your password\?/i }),
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(generateOTPMock).not.toHaveBeenCalled();
    });

    const emailInput = screen.getByLabelText(
      /enter the email linked to your account/i,
    );
    await user.type(emailInput, "invalid-email");
    await user.click(nextButton);

    await waitFor(() => {
      expect(generateOTPMock).not.toHaveBeenCalled();
    });
  });

  it("handles API error on Step 0 when generateOTP fails", async () => {
    const user = userEvent.setup();
    generateOTPMock.mockRejectedValueOnce({
      response: {
        data: {
          message: "User with this email does not exist",
        },
      },
    });

    render(<ForgotPassword />);

    await user.click(
      screen.getByRole("button", { name: /forgot your password\?/i }),
    );

    const emailInput = screen.getByLabelText(
      /enter the email linked to your account/i,
    );
    await user.type(emailInput, "user@example.com");

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(generateOTPMock).toHaveBeenCalledWith({
        email: "user@example.com",
      });
      expect(
        screen.getByText(/user with this email does not exist/i),
      ).toBeInTheDocument();
    });
  });

  it("successfully completes step 0, step 1, and step 2", async () => {
    const user = userEvent.setup();
    generateOTPMock.mockResolvedValueOnce({
      status: 200,
      data: { message: "OTP sent to your email" },
    });
    verifyOTPMock.mockResolvedValueOnce({
      status: 200,
      data: { message: "OTP verified successfully" },
    });
    changePasswordMock.mockResolvedValueOnce({
      status: 200,
      data: { message: "Password updated successfully" },
    });

    render(<ForgotPassword />);

    await user.click(
      screen.getByRole("button", { name: /forgot your password\?/i }),
    );

    const emailInput = screen.getByLabelText(
      /enter the email linked to your account/i,
    );
    await user.type(emailInput, "test@example.com");

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(generateOTPMock).toHaveBeenCalledWith({
        email: "test@example.com",
      });
      expect(toast.success).toHaveBeenCalledWith("OTP sent to your email", {
        duration: 5000,
        description: "",
      });
      expect(
        screen.getByText(/Enter the 6-digit code we sent to your email/i),
      ).toBeInTheDocument();
    });

    const otpInput = screen.getByRole("textbox");
    await user.type(otpInput, "123456");
    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(verifyOTPMock).toHaveBeenCalledWith({
        email: "test@example.com",
        otp: "123456",
      });
      expect(toast.success).toHaveBeenCalledWith("OTP verified successfully", {
        duration: 5000,
        description: "",
      });
      expect(screen.getByLabelText(/^new password$/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/confirm new password/i),
      ).toBeInTheDocument();
    });

    const passwordInput = screen.getByLabelText(/^new password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm new password/i);

    await user.type(passwordInput, "New@Password123");
    await user.type(confirmPasswordInput, "New@Password123");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(changePasswordMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "New@Password123",
      });
      expect(toast.success).toHaveBeenCalledWith(
        "Password updated successfully",
        {
          duration: 5000,
          description: "Login to continue",
        },
      );
      expect(
        screen.queryByText(/reset your password/i),
      ).not.toBeInTheDocument();
    });
  });

  it("resets step and form state when dialog is closed", async () => {
    const user = userEvent.setup();
    render(<ForgotPassword />);

    await user.click(
      screen.getByRole("button", { name: /forgot your password\?/i }),
    );

    expect(
      screen.getByText(/enter the email linked to your account/i),
    ).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/reset your password/i),
      ).not.toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", { name: /forgot your password\?/i }),
    );
    expect(
      screen.getByText(/enter the email linked to your account/i),
    ).toBeInTheDocument();
  });
});
