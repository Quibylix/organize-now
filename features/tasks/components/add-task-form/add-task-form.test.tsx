import en from "@/features/i18n/data/en.json";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, it, vi } from "vitest";
import AddTaskForm from "./add-task-form.component";

describe("AddTaskForm", () => {
  const dictionary = en.addTask.form;

  beforeAll(() => {
    vi.mock("next-nprogress-bar", () => ({
      useRouter: () => {},
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should render the form with inputs for name, description, datetime, priority, and category", () => {
    render(<AddTaskForm dictionary={dictionary} />);

    screen.getByLabelText(dictionary.nameLabel);
    screen.getByLabelText(dictionary.descriptionLabel);
    screen.getByLabelText(dictionary.datetimeLabel);
    screen.getByText(dictionary.priorityLabel);
    screen.getByLabelText(dictionary.categoryLabel);
  });

  it("should render the submit button", () => {
    render(<AddTaskForm dictionary={dictionary} />);

    screen.getByRole("button", { name: dictionary.submitButton });
  });

  it("should render an error message if the name input is invalid", () => {
    render(<AddTaskForm dictionary={dictionary} />);

    const nameInput = screen.getByLabelText(dictionary.nameLabel);

    act(() => nameInput.focus());
    act(() => nameInput.blur());

    screen.getByText("Name must not be empty");
  });

  it("should render an error message if the datetime-local input is invalid", () => {
    render(<AddTaskForm dictionary={dictionary} />);

    const datetimeInput = screen.getByLabelText(dictionary.datetimeLabel);

    act(() => datetimeInput.focus());
    act(() => datetimeInput.blur());

    screen.getByText("Invalid datetime");
  });

  it("should render an  error message if the datetime-local input is in the past", () => {
    render(<AddTaskForm dictionary={dictionary} />);

    const datetimeInput = screen.getByLabelText(dictionary.datetimeLabel);
    act(() => datetimeInput.focus());
    act(() =>
      fireEvent.input(datetimeInput, { target: { value: "2021-01-01T00:00" } }),
    );
    act(() => datetimeInput.blur());

    screen.getByText("Datetime must be in the future");
  });

  it("should render an error message if the category input is invalid", () => {
    render(<AddTaskForm dictionary={dictionary} />);

    const categoryLabel = screen.getByLabelText(dictionary.categoryLabel);

    act(() => categoryLabel.focus());
    act(() => categoryLabel.blur());

    screen.getByText("Category must not be empty");
  });

  it("should render all of error messages on form submit", () => {
    render(<AddTaskForm dictionary={dictionary} />);

    const submitButton = screen.getByRole("button", {
      name: dictionary.submitButton,
    });
    act(() => fireEvent.click(submitButton));

    screen.getByText("Name must not be empty");
    screen.getByText("Invalid datetime");
    screen.getByText("Category must not be empty");
  });
});
