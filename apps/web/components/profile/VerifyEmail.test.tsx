import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VerifyEmail } from "./VerifyEmail";
import { useSendVerificationLink } from "@/hooks";
import { useUserStore } from "@/store";

vi.mock("@/hooks", () => ({
  useSendVerificationLink: vi.fn(),
}));

describe("VerifyEmail", () => {
  const mutateAsyncMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({ email: "user@example.com" });
    vi.mocked(useSendVerificationLink).mockReturnValue({
      mutateAsync: mutateAsyncMock,
      isPending: false,
      isSuccess: false,
      error: null,
    } as unknown as ReturnType<typeof useSendVerificationLink>);
  });

  it("renders verify email trigger button", () => {
    render(<VerifyEmail />);

    const triggerBtn = screen.getByRole("button", {
      name: /verify your email/i,
    });
    expect(triggerBtn).toBeInTheDocument();
  });

  it("opens dialog and calls send verification link mutation on click", async () => {
    const user = userEvent.setup();
    render(<VerifyEmail />);

    const triggerBtn = screen.getByRole("button", {
      name: /verify your email/i,
    });
    await user.click(triggerBtn);

    const sendBtn = screen.getByRole("button", {
      name: /send verification link/i,
    });
    expect(sendBtn).toBeInTheDocument();

    await user.click(sendBtn);
    expect(mutateAsyncMock).toHaveBeenCalledWith({ email: "user@example.com" });
  });

  it("displays success message when verification email is sent", async () => {
    const user = userEvent.setup();
    vi.mocked(useSendVerificationLink).mockReturnValue({
      mutateAsync: mutateAsyncMock,
      isPending: false,
      isSuccess: true,
      error: null,
    } as unknown as ReturnType<typeof useSendVerificationLink>);

    render(<VerifyEmail />);

    const triggerBtn = screen.getByRole("button", {
      name: /verify your email/i,
    });
    await user.click(triggerBtn);

    expect(
      screen.getByText(/verification link sent! please check your inbox/i),
    ).toBeInTheDocument();
  });
});
