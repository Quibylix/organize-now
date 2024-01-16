import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, describe, expect, it, vi } from "vitest";
import LoginForm from "./login-form.component";

vi.mock(
  "@/features/auth/components/login-form/services/login-user.service",
  () => ({
    default: () => {
      const call = () => Promise.resolve({ success: true });
      call.controller = new AbortController();

      return call;
    },
  }),
);

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: () => {},
  }),
}));

afterAll(() => {
  vi.clearAllMocks();
});

describe("LoginForm", () => {
  it("should render a form with username, and password fields", () => {
    render(<LoginForm />);

    screen.getByRole("form", { name: "Login form" });
    screen.getByLabelText("Username");
    screen.getByLabelText("Password");
  });

  it("should render a submit button", () => {
    render(<LoginForm />);

    screen.getByRole("button", { name: "Login" });
  });

  it("should render an error message if the username does not have the required length", () => {
    render(<LoginForm />);

    act(() => screen.getByLabelText("Username").focus());
    act(() => screen.getByLabelText("Username").blur());

    screen.getByText("Username must be between 3 and 20 characters");
  });

  it("should render an error message if the username has other characters than letters, numbers, and underscores", () => {
    render(<LoginForm />);

    act(() => screen.getByLabelText("Username").focus());
    act(() => screen.getByLabelText("Username").blur());
    act(() =>
      fireEvent.input(screen.getByLabelText("Username"), {
        target: { value: "test!" },
      }),
    );

    screen.getByText(
      "Username must only contain letters, numbers, and underscores",
    );
  });

  it("should not render an error message if the username is valid", () => {
    render(<LoginForm />);

    act(() => screen.getByLabelText("Username").focus());
    act(() => screen.getByLabelText("Username").blur());
    act(() =>
      fireEvent.input(screen.getByLabelText("Username"), {
        target: { value: "test" },
      }),
    );

    expect(() =>
      screen.getByText("Username must be between 3 and 20 characters"),
    ).to.throw();
  });

  it("should render an error message if the password does not have the required length", () => {
    render(<LoginForm />);

    act(() => screen.getByLabelText("Password").focus());
    act(() => screen.getByLabelText("Password").blur());

    screen.getByText("Password must be between 8 and 50 characters");
  });

  it("should render an error message if the password has no uppercase letters", () => {
    render(<LoginForm />);

    act(() => screen.getByLabelText("Password").focus());
    act(() => screen.getByLabelText("Password").blur());
    act(() =>
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "testpassword" },
      }),
    );

    screen.getByText("Password must contain at least one uppercase letter");
  });

  it("should render an error message if the password has no lowercase letters", () => {
    render(<LoginForm />);

    act(() => screen.getByLabelText("Password").focus());
    act(() => screen.getByLabelText("Password").blur());
    act(() =>
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "TESTPASSWORD" },
      }),
    );

    screen.getByText("Password must contain at least one lowercase letter");
  });

  it("should render an error message if the password has no numbers", () => {
    render(<LoginForm />);

    act(() => screen.getByLabelText("Password").focus());
    act(() => screen.getByLabelText("Password").blur());
    act(() =>
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "TestPassword" },
      }),
    );

    screen.getByText("Password must contain at least one number");
  });
});
