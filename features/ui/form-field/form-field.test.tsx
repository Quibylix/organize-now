import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormField from ".";

describe("FormField", () => {
  it("should render an input", () => {
    render(<FormField />);

    screen.getByRole("textbox");
  });

  it("should accept all HTML input attributes", () => {
    render(<FormField id="test" className="a" />);

    const input = screen.getByRole("textbox");

    expect(input).to.have.property("id", "test");
    expect(input).to.have.property("classList");
    expect(Array.from(input.classList)).to.contain("a");
  });
});

describe("FormFieldLabel", () => {
  it("should render a label and an input", () => {
    render(
      <FormField.Label label="test-label">
        <FormField />
      </FormField.Label>,
    );

    screen.getByLabelText("test-label");
  });

  it("should allow to pass a password field", () => {
    render(
      <FormField.Label label="test-label">
        <FormField.Password />
      </FormField.Label>,
    );

    screen.getByLabelText("test-label");
    screen.getByRole("button", { name: "Show" });
  });
});

describe("PasswordFormField", () => {
  it("should render a password input", () => {
    render(<FormField.Password data-testid="password-field" />);

    const input = screen.getByTestId("password-field");

    expect(input).to.have.property("nodeName", "INPUT");
    expect(input).to.have.property("type", "password");
  });

  it("should show the password when clicking on the show button", () => {
    render(<FormField.Password data-testid="password-field" />);

    const input = screen.getByTestId("password-field");
    const button = screen.getByRole("button", { name: "Show" });

    expect(input).to.have.property("type", "password");

    act(() => fireEvent.click(button));

    expect(input).to.have.property("type", "text");
  });

  it("should hide the password when clicking on the show button twice", () => {
    render(<FormField.Password data-testid="password-field" />);

    const input = screen.getByTestId("password-field");
    const button = screen.getByRole("button", { name: "Show" });

    expect(input).to.have.property("type", "password");

    act(() => fireEvent.click(button));
    act(() => fireEvent.click(button));

    expect(input).to.have.property("type", "password");
  });
});
