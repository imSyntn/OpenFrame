import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "./StatCard";

describe("StatCard", () => {
  it("renders numerical value and label", () => {
    render(<StatCard label="Total Downloads" value={1420} />);

    expect(screen.getByText("1420")).toBeInTheDocument();
    expect(screen.getByText("Total Downloads")).toBeInTheDocument();
  });

  it("renders 0 if value is undefined", () => {
    render(<StatCard label="Views" />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Views")).toBeInTheDocument();
  });

  it("renders skeleton loader when isLoading is true", () => {
    render(<StatCard label="Likes" isLoading={true} />);

    expect(screen.queryByText("Likes")).not.toBeInTheDocument();
  });
});
