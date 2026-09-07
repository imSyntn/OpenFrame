import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeToggle test", () => {
  const setThemeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      setTheme: setThemeMock,
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      resolvedTheme: "light",
    });
  });

  it("renders the toggle button after mounting", () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    expect(toggleButton).toBeInTheDocument();
  });

  it("opens dropdown menu and allows user to select Dark theme", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    await user.click(toggleButton);

    const darkOption = screen.getByRole("menuitemcheckbox", { name: /dark/i });
    expect(darkOption).toBeInTheDocument();

    await user.click(darkOption);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with 'system' when system option is selected", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    await user.click(toggleButton);

    const systemOption = screen.getByRole("menuitemcheckbox", {
      name: /system/i,
    });
    await user.click(systemOption);

    expect(setThemeMock).toHaveBeenCalledWith("system");
  });
});
