import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MigrationNotice } from "./Migration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("MigrationNotice", () => {
  it("renders scheduled maintenance and infrastructure migration modal", () => {
    const queryClient = new QueryClient();
    const cancelQueriesSpy = vi.spyOn(queryClient, "cancelQueries");

    render(
      <QueryClientProvider client={queryClient}>
        <MigrationNotice />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Scheduled Maintenance")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Infrastructure Migration" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /OpenFrame is moving to a new infrastructure to deliver a faster/i,
      ),
    ).toBeInTheDocument();

    expect(cancelQueriesSpy).toHaveBeenCalled();
  });
});
