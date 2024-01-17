import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./button.component";

describe("Button", () => {
  it("should render a button", () => {
    render(<Button>Click me</Button>);

    screen.getByRole("button");
  });
});

describe("Button.AsLink", () => {
  it("should render a link", () => {
    render(<Button.AsLink href="/">Click me</Button.AsLink>);

    screen.getByRole("link");
  });

  it("should accept all props that a link accepts", () => {
    render(
      <Button.AsLink href="/" className="test" data-testid="test">
        Click me
      </Button.AsLink>,
    );

    const link = screen.getByTestId("test");
    expect(Array.from(link.classList)).to.contain("test");
  });
});
