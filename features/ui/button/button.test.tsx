import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Button from ".";

describe("Button", () => {
  it("should render a button", () => {
    render(<Button>Click me</Button>);

    screen.getByRole("button");
  });
});
