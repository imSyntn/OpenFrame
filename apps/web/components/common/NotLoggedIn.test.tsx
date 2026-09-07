import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotLoggedIn from "./NotLoggedIn";

describe("NotLoggedIn", () => {
  it("renders heading and default message when no prop is supplied", () => {
    render(<NotLoggedIn />);

    expect(
      screen.getByRole("heading", { level: 1, name: "You are not logged in" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Please login to continue")).toBeInTheDocument();
  });

  it("renders custom message when provided", () => {
    render(<NotLoggedIn message="Custom login warning message" />);

    expect(screen.getByText("Custom login warning message")).toBeInTheDocument();
  });

  it("renders navigation links for Login and Go home", () => {
    render(<NotLoggedIn />);

    const loginLink = screen.getByRole("link", { name: "Login" });
    const homeLink = screen.getByRole("link", { name: "Go home" });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
