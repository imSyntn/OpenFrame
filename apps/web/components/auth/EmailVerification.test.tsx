import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailVerification } from "./EmailVerification";
import { useSearchParams } from "next/navigation";
import { useVerifyEmailToken } from "@/hooks";
import { render, screen } from "@testing-library/react";

const mockGet = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(() => ({ get: mockGet })),
}));

vi.mock("@/hooks", () => ({
  useVerifyEmailToken: vi.fn(),
}));

describe("EmailVerification Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state when isLoading is true", () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams({ token: "test-token" }) as unknown as ReturnType<
        typeof useSearchParams
      >,
    );
    vi.mocked(useVerifyEmailToken).mockReturnValue({
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useVerifyEmailToken>);

    render(<EmailVerification />);

    expect(screen.getByText(/Verifying your email/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please wait while we verify your email address./i),
    ).toBeInTheDocument();
  });

  it("renders success state when useVerifyEmailToken returns success", () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams({ token: "test-token" }) as unknown as ReturnType<
        typeof useSearchParams
      >,
    );
    vi.mocked(useVerifyEmailToken).mockReturnValue({
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useVerifyEmailToken>);

    render(<EmailVerification />);

    expect(screen.getByText(/Email verified/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your email has been successfully verified/i),
    ).toBeInTheDocument();
  });

  it("renders error state when useVerifyEmailToken returns error", () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams({ token: "test-token" }) as unknown as ReturnType<
        typeof useSearchParams
      >,
    );
    vi.mocked(useVerifyEmailToken).mockReturnValue({
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useVerifyEmailToken>);

    render(<EmailVerification />);

    expect(screen.getByText(/Verification failed/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This verification link is invalid or has expired/i),
    ).toBeInTheDocument();
  });

  it("parses token from search params", () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams({ token: "test-token" }) as unknown as ReturnType<
        typeof useSearchParams
      >,
    );
    vi.mocked(useVerifyEmailToken).mockReturnValue({
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useVerifyEmailToken>);

    render(<EmailVerification />);

    expect(useVerifyEmailToken).toHaveBeenCalledWith("test-token");
  });

  it("renders without crashing when token is null", () => {
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams({}) as unknown as ReturnType<typeof useSearchParams>,
    );
    vi.mocked(useVerifyEmailToken).mockReturnValue({
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useVerifyEmailToken>);

    render(<EmailVerification />);

    expect(
      screen.queryByRole("heading", { name: /Verifying your email/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Verification failed/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Email verified/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/No token provided/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please provide a token to verify your email address/i),
    ).toBeInTheDocument();
  });
});
