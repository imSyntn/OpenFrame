import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders search input with placeholder and value", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="mountains" onChange={handleChange} />);

    const searchInput = screen.getByPlaceholderText(
      "Search high-resolution photos...",
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("mountains");
  });

  it("calls onChange when user types in the input", () => {
    const handleChange = vi.fn();

    render(<SearchBar value="" onChange={handleChange} />);

    const searchInput = screen.getByPlaceholderText(
      "Search high-resolution photos...",
    );
    fireEvent.change(searchInput, { target: { value: "nature" } });

    expect(handleChange).toHaveBeenCalledWith("nature");
  });

  it("calls onClick callback when user clicks search button", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const handleClick = vi.fn();

    render(
      <SearchBar
        value="sunset"
        onChange={handleChange}
        onClick={handleClick}
      />,
    );

    const searchButton = screen.getByRole("button");
    await user.click(searchButton);

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
