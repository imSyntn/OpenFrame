import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateCollection } from "./CreateCollection";
import { useUserStore } from "@/store";

vi.mock("@/hooks", () => ({
  useCreateCollection: vi.fn().mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({ data: { id: "col-1" } }),
  }),
  useUpdateCollection: vi.fn().mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
  }),
}));

describe("CreateCollection", () => {
  beforeEach(() => {
    useUserStore.setState({ isLoggedIn: false });
  });

  it("disables Create collection button when user is not logged in", () => {
    render(<CreateCollection />);

    const createBtn = screen.getByRole("button", {
      name: "Create collection",
    });
    expect(createBtn).toBeDisabled();
  });

  it("enables button and opens dialog when user is logged in", async () => {
    const user = userEvent.setup();
    useUserStore.setState({ isLoggedIn: true });

    render(<CreateCollection />);

    const createBtn = screen.getByRole("button", {
      name: "Create collection",
    });
    expect(createBtn).toBeEnabled();

    await user.click(createBtn);

    expect(
      screen.getByRole("heading", { name: "Create collection" }),
    ).toBeInTheDocument();
  });
});
