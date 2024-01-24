import en from "@/features/i18n/data/en.json";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, describe, expect, it, vi } from "vitest";
import RegisterForm from "./register-form.component";

vi.mock(
  "@/features/auth/components/register-form/services/register-user.service",
  () => ({
    default: () => {
      const call = () => Promise.resolve({ success: true });
      call.controller = new AbortController();

      return call;
    },
  }),
);

vi.mock("next-nprogress-bar", () => ({
  useRouter: () => ({
    push: () => {},
  }),
}));

afterAll(() => {
  vi.clearAllMocks();
});

const dictionary = en.register.form;

describe("RegisterForm", () => {
  it("should render a form with username, password, and confirm password fields", () => {
    render(<RegisterForm dictionary={dictionary} />);

    screen.getByRole("form", { name: dictionary.formTitle });
    screen.getByLabelText(dictionary.usernameLabel);
    screen.getByLabelText(dictionary.passwordLabel);
    screen.getByLabelText(dictionary.confirmPasswordLabel);
  });

  it("should render a submit button", () => {
    render(<RegisterForm dictionary={dictionary} />);

    screen.getByRole("button", { name: dictionary.submitButton });
  });

  it("should render an error message if the username does not have the required length", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.usernameLabel).focus());
    act(() => screen.getByLabelText(dictionary.usernameLabel).blur());

    screen.getByText("Username must be between 3 and 20 characters");
  });

  it("should render an error message if the username has other characters than letters, numbers, and underscores", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.usernameLabel).focus());
    act(() => screen.getByLabelText(dictionary.usernameLabel).blur());
    act(() =>
      fireEvent.input(screen.getByLabelText(dictionary.usernameLabel), {
        target: { value: "test!" },
      }),
    );

    screen.getByText(
      "Username must only contain letters, numbers, and underscores",
    );
  });

  it("should not render an error message if the username is valid", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.usernameLabel).focus());
    act(() => screen.getByLabelText(dictionary.usernameLabel).blur());
    act(() =>
      fireEvent.input(screen.getByLabelText(dictionary.usernameLabel), {
        target: { value: "test" },
      }),
    );

    expect(() =>
      screen.getByText("Username must be between 3 and 20 characters"),
    ).to.throw();
  });

  it("should render an error message if the password does not have the required length", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.passwordLabel).focus());
    act(() => screen.getByLabelText(dictionary.passwordLabel).blur());

    screen.getByText("Password must be between 8 and 50 characters");
  });

  it("should render an error message if the password has no uppercase letters", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.passwordLabel).focus());
    act(() => screen.getByLabelText(dictionary.passwordLabel).blur());
    act(() =>
      fireEvent.input(screen.getByLabelText(dictionary.passwordLabel), {
        target: { value: "testpassword" },
      }),
    );

    screen.getByText("Password must contain at least one uppercase letter");
  });

  it("should render an error message if the password has no lowercase letters", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.passwordLabel).focus());
    act(() => screen.getByLabelText(dictionary.passwordLabel).blur());
    act(() =>
      fireEvent.input(screen.getByLabelText(dictionary.passwordLabel), {
        target: { value: "TESTPASSWORD" },
      }),
    );

    screen.getByText("Password must contain at least one lowercase letter");
  });

  it("should render an error message if the password has no numbers", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.passwordLabel).focus());
    act(() => screen.getByLabelText(dictionary.passwordLabel).blur());
    act(() =>
      fireEvent.input(screen.getByLabelText(dictionary.passwordLabel), {
        target: { value: "TestPassword" },
      }),
    );

    screen.getByText("Password must contain at least one number");
  });

  it("should render an error message if the confirm password does not match the password", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.passwordLabel).focus());
    act(() => screen.getByLabelText(dictionary.passwordLabel).blur());
    act(() =>
      fireEvent.input(screen.getByLabelText(dictionary.passwordLabel), {
        target: { value: "TestPassword1" },
      }),
    );

    screen.getByText("Passwords do not match");
  });

  it("should not render an error message if both passwords match", () => {
    render(<RegisterForm dictionary={dictionary} />);

    act(() => screen.getByLabelText(dictionary.passwordLabel).focus());
    act(() => screen.getByLabelText(dictionary.passwordLabel).blur());
    act(() =>
      fireEvent.input(screen.getByLabelText(dictionary.passwordLabel), {
        target: { value: "TestPassword1" },
      }),
    );
    act(() =>
      fireEvent.input(screen.getByLabelText(dictionary.confirmPasswordLabel), {
        target: { value: "TestPassword1" },
      }),
    );

    expect(() => screen.getByText("Passwords do not match")).to.throw();
  });
});
