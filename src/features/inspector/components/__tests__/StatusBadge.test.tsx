import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { StatusBadge } from "../StatusBadge";

describe("StatusBadge", () => {
  it("renders the status text", () => {
    render(
      <StatusBadge status="healthy" />,
    );

    expect(
      screen.getByText("healthy"),
    ).toBeInTheDocument();
  });

  it("applies green styling for healthy status", () => {
    render(
      <StatusBadge status="healthy" />,
    );

    const badge =
      screen.getByText("healthy");

    expect(badge.className).toContain(
      "text-green-400",
    );
  });

  it("applies yellow styling for degraded status", () => {
    render(
      <StatusBadge status="degraded" />,
    );

    const badge =
      screen.getByText("degraded");

    expect(badge.className).toContain(
      "text-yellow-400",
    );
  });

  it("applies red styling for down status", () => {
    render(
      <StatusBadge status="down" />,
    );

    const badge = screen.getByText("down");

    expect(badge.className).toContain(
      "text-red-400",
    );
  });
});
