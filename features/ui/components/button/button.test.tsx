import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Button from "./button.component";

describe("Button", () => {
  it("should render a button", () => {
    render(<Button>Click me</Button>);

    screen.getByRole("button");
  });
});
