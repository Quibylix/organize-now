import { LANGUAGE_COOKIE_NAME } from "@/features/i18n/constants/language.constant";
import en from "@/features/i18n/data/en.json";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MOCKED_TASKS } from "./__mocks__/tasks.mock";
import Tasks from "./tasks.component";

vi.mock("./services/getTasks.service", () => ({
  getTasks: () => ({
    success: true,
    data: MOCKED_TASKS,
  }),
}));

vi.mock("next/headers", () => ({
  ...vi.importActual("next/headers"),
  cookies: () => ({
    get: () => ({ name: LANGUAGE_COOKIE_NAME, value: "en" }),
  }),
}));

const MOCKED_UNCOMPLETED_TASKS = MOCKED_TASKS.filter(
  ({ status }) => status === "uncompleted",
);
const MOCKED_COMPLETED_TASKS = MOCKED_TASKS.filter(
  ({ status }) => status === "completed",
);

describe("Tasks", () => {
  it("should render a list of uncompleted tasks with its name, category, date and priority", async () => {
    render(await Tasks({}));

    const uncompletedTasks = within(
      screen.getByRole("list", { name: en.tasks.uncompletedTasks }),
    ).getAllByRole("listitem");

    uncompletedTasks.forEach((task, index) => {
      const { name, datetime, category, priority } =
        MOCKED_UNCOMPLETED_TASKS[index];

      expect(task.textContent).to.include(name);
      expect(task.textContent).to.include(datetime.toLocaleString());
      expect(task.textContent).to.include(category);
      expect(task.textContent).to.include(priority);
    });
  });

  it("should render a list of completed tasks with its name, category, date and priority", async () => {
    render(await Tasks({}));

    const completedTasks = within(
      screen.getByRole("list", { name: en.tasks.completedTasks }),
    ).getAllByRole("listitem");

    completedTasks.forEach((task, index) => {
      const { name, datetime, category, priority } =
        MOCKED_COMPLETED_TASKS[index];

      expect(task.textContent).to.include(name);
      expect(task.textContent).to.include(datetime.toLocaleString());
      expect(task.textContent).to.include(category);
      expect(task.textContent).to.include(priority);
    });
  });

  it("should render a checkbox for each task", async () => {
    render(await Tasks({}));

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).to.be.equal(MOCKED_TASKS.length);
  });

  it("should render a checked checkbox for each completed task", async () => {
    render(await Tasks({}));

    const checkboxes = within(
      screen.getByRole("list", { name: en.tasks.completedTasks }),
    ).getAllByRole("checkbox");

    checkboxes.forEach((checkbox, index) => {
      const { status } = MOCKED_COMPLETED_TASKS[index];
      expect(checkbox).to.have.property("checked", status === "completed");
    });
  });
});
