import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Input from "./input.component";
import PasswordInput from "./password-input.component";

describe("Input", () => {
  it("should render an input field", () => {
    render(<Input />);

    screen.getByRole("textbox");
  });

  it("should render a label if provided", () => {
    render(<Input label="Username" />);

    screen.getByLabelText("Username");
  });

  it("should render start content if provided", () => {
    render(<Input startContent={<span>Start</span>} />);

    screen.getByText("Start");
  });

  it("should render end content if provided", () => {
    render(<Input endContent={<span>End</span>} />);

    screen.getByText("End");
  });

  it("should call onFocus callback when input is focused", () => {
    const onFocusMock = vi.fn();
    render(<Input onFocus={onFocusMock} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);

    expect(onFocusMock).toHaveBeenCalled();
  });

  it("should call onBlur callback when input is blurred", () => {
    const onBlurMock = vi.fn();
    render(<Input onBlur={onBlurMock} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    expect(onBlurMock).toHaveBeenCalled();
  });

  it("should apply custom className to the input element", () => {
    render(<Input className="custom-input" />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement.classList).toContain("custom-input");
  });

  it("should display error message if error prop is provided", () => {
    render(<Input error="Invalid input" />);

    expect(screen.getByRole("alert")).to.have.property(
      "textContent",
      "Invalid input",
    );
  });
});

describe("PasswordInput", () => {
  it("should render a password input field", () => {
    render(<PasswordInput label="Password label" />);

    const inputElement = screen.getByLabelText("Password label");
    expect(inputElement.getAttribute("type")).toBe("password");
  });

  it("should toggle password visibility when show password button is clicked", () => {
    render(<PasswordInput label="Password label" />);

    const showPasswordButton = screen.getByLabelText(
      "Toggle password visibility",
    );
    const inputElement = screen.getByLabelText("Password label");

    fireEvent.click(showPasswordButton);
    expect(inputElement.getAttribute("type")).toBe("text");

    fireEvent.click(showPasswordButton);
    expect(inputElement.getAttribute("type")).toBe("password");
  });

  it("should render end content along with show password button", () => {
    render(<PasswordInput endContent={<span>End</span>} />);

    screen.getByText("End");
    screen.getByLabelText("Toggle password visibility");
  });
});
