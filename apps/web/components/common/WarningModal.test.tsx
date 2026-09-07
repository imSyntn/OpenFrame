import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WarningModal } from "./WarningModal";

describe("WarningModal", () => {
  it("renders trigger child and opens modal on click", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <WarningModal onClick={handleClick}>
        <button>Delete Account</button>
      </WarningModal>,
    );

    const triggerBtn = screen.getByRole("button", { name: "Delete Account" });
    expect(triggerBtn).toBeInTheDocument();

    await user.click(triggerBtn);

    expect(screen.getByRole("heading", { name: "Warning" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "This action is irreversible. Are you sure you want to continue?",
      ),
    ).toBeInTheDocument();
  });

  it("displays custom title when provided", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <WarningModal title="Confirm Deletion" onClick={handleClick}>
        <button>Delete Item</button>
      </WarningModal>,
    );

    await user.click(screen.getByRole("button", { name: "Delete Item" }));

    expect(
      screen.getByRole("heading", { name: "Confirm Deletion" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when Continue button is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <WarningModal onClick={handleClick}>
        <button>Open Modal</button>
      </WarningModal>,
    );

    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
