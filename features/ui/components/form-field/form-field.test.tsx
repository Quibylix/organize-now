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
        <FormField.Password data-testid="password-field" />
      </FormField.Label>,
    );

    screen.getByLabelText("test-label");
    screen.getByTestId("password-field");
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
    const button = screen.getByRole("button", {
      name: "Toggle password visibility",
    });

    expect(input).to.have.property("type", "password");

    act(() => fireEvent.click(button));

    expect(input).to.have.property("type", "text");
  });

  it("should hide the password when clicking on the show button twice", () => {
    render(<FormField.Password data-testid="password-field" />);

    const input = screen.getByTestId("password-field");
    const button = screen.getByRole("button", {
      name: "Toggle password visibility",
    });

    expect(input).to.have.property("type", "password");

    act(() => fireEvent.click(button));
    act(() => fireEvent.click(button));

    expect(input).to.have.property("type", "password");
  });
});

describe("FormFieldWithError", () => {
  it("should render an error message", () => {
    render(
      <FormField.WithError error="test-error">
        <FormField.Label label="test-label">
          <FormField />
        </FormField.Label>
      </FormField.WithError>,
    );

    expect(screen.getByRole("alert")).to.have.property(
      "textContent",
      "test-error",
    );
  });

  it("should not render an error message if there is no error", () => {
    render(
      <FormField.WithError>
        <FormField.Label label="test-label">
          <FormField />
        </FormField.Label>
      </FormField.WithError>,
    );

    expect(() => screen.getByRole("alert")).to.throw();
  });

  it("should not render an error message if the error is an empty string", () => {
    render(
      <FormField.WithError error="">
        <FormField.Label label="test-label">
          <FormField />
        </FormField.Label>
      </FormField.WithError>,
    );

    expect(() => screen.getByRole("alert")).to.throw();
  });
});
