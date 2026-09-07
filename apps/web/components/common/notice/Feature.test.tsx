import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Feature } from "./Feature";

describe("Feature Notice", () => {
  const storageKey = "test_feature_key";

  beforeEach(() => {
    localStorage.clear();
  });

  it("renders title and description when localStorage key is not set", () => {
    render(
      <Feature
        storageKey={storageKey}
        title="New AI Feature"
        description="Try our image generator now"
      />,
    );

    expect(screen.getByText("New AI Feature")).toBeInTheDocument();
    expect(screen.getByText("Try our image generator now")).toBeInTheDocument();
  });

  it("does not render when localStorage key is already set to true", () => {
    localStorage.setItem(storageKey, "true");

    const { container } = render(
      <Feature
        storageKey={storageKey}
        title="New AI Feature"
        description="Try our image generator now"
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("dismisses notice and sets localStorage key when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Feature
        storageKey={storageKey}
        title="New AI Feature"
        description="Try our image generator now"
      />,
    );

    const closeBtn = screen.getByRole("button", {
      name: /close feature announcement/i,
    });
    await user.click(closeBtn);

    expect(localStorage.getItem(storageKey)).toBe("true");
    expect(screen.queryByText("New AI Feature")).not.toBeInTheDocument();
  });
});
