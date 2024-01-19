import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MOCKED_TASKS } from "./__mocks__/tasks.mock";
import Tasks from "./tasks.component";

vi.mock("./services/getTasks.service", () => ({
  getTasks: () => ({
    success: true,
    data: MOCKED_TASKS,
  }),
}));

describe("Tasks", () => {
  it("should render a list of mocked tasks with its name, category, date and priority", async () => {
    render(await Tasks({}));

    const items = screen.getAllByRole("listitem");
    expect(items.length).to.be.equal(MOCKED_TASKS.length);

    items.forEach((item, index) => {
      const task = MOCKED_TASKS[index];

      expect(item.textContent).to.include(task.name);
      expect(item.textContent).to.include(task.datetime.toLocaleString());
      expect(item.textContent).to.include(task.category);
      expect(item.textContent).to.include(task.priority);
    });
  });

  it("should render a checkbox for each task", async () => {
    render(await Tasks({}));

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).to.be.equal(MOCKED_TASKS.length);
  });

  it("should render a checked checkbox for each completed task", async () => {
    render(await Tasks({}));

    const checkboxes = screen.getAllByRole("checkbox");

    checkboxes.forEach((checkbox, index) => {
      const { status } = MOCKED_TASKS[index];
      expect(checkbox).to.have.property("checked", status === "completed");
    });
  });
});
