import { MOCKED_TASKS } from "@/features/tasks/components/tasks/__mocks__/tasks.mock";
import test, { expect } from "@playwright/test";

test.describe("Task details", () => {
  test("should return a 404 error if the task id is not a number", async ({
    page,
  }) => {
    await page.goto("/task/invalid-id");

    await expect(page.getByText("404")).toBeVisible();
  });

  test("should display an error message if the task does not exist", async ({
    page,
  }) => {
    await page.goto("/task/999");

    await expect(
      page.getByText("Task not found", { exact: true }),
    ).toBeVisible();
  });

  test("should display the task details", async ({ page }) => {
    await page.goto("/task/1");

    const task = MOCKED_TASKS[0];

    await expect(page.getByText(task.name, { exact: true })).toBeVisible();
    await expect(
      page.getByText(task.description, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(task.datetime.toLocaleString(), { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(task.priority.toString(), { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(task.category, { exact: true })).toBeVisible();

    if (task.status === "completed") {
      await expect(page.getByRole("checkbox", { exact: true })).toHaveAttribute(
        "checked",
      );
    } else {
      await expect(
        page.getByRole("checkbox", { exact: true }),
      ).not.toHaveAttribute("checked");
    }
  });

  test("should display the task details if the user clicks on the task name in the tasks list", async ({
    page,
  }) => {
    await page.goto("/");

    const task = MOCKED_TASKS[0];

    await page.getByRole("heading", { name: task.name, exact: true }).click();

    await expect(page).toHaveURL("/task/1");

    await expect(page.getByText(task.name, { exact: true })).toBeVisible();
    await expect(
      page.getByText(task.description, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(task.datetime.toLocaleString(), { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(task.priority.toString(), { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(task.category, { exact: true })).toBeVisible();

    if (task.status === "completed") {
      await expect(page.getByRole("checkbox", { exact: true })).toHaveAttribute(
        "checked",
      );
    } else {
      await expect(
        page.getByRole("checkbox", { exact: true }),
      ).not.toHaveAttribute("checked");
    }
  });
});
