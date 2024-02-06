import en from "@/features/i18n/data/en.json" assert { type: "json" };
import { MOCKED_TASKS } from "@/features/tasks/components/tasks/__mocks__/tasks.mock";
import test, { expect } from "@playwright/test";

test.describe("Delete task", () => {
  test.use({ storageState: "e2e/.auth/user-to-edit-tasks.json" });

  test("clicking on the delete task button should display a confirmation dialog", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[0];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("button", { name: en.task.delete.deleteTask, exact: true })
      .click();

    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByText(en.task.delete.areYouSure, { exact: true }),
    ).toBeInViewport();

    await dialog
      .getByRole("button", { name: en.task.delete.cancel, exact: true })
      .click();

    await expect(dialog).not.toBeInViewport();
  });

  test("clicking on the delete task button and then confirming should delete the task", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[0];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("button", { name: en.task.delete.deleteTask, exact: true })
      .click();

    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    await dialog
      .getByRole("button", { name: en.task.delete.delete, exact: true })
      .click();

    await page.waitForURL("/");

    await expect(page.getByText(task.name, { exact: true })).not.toBeVisible();
  });
});

test.describe("Edit task", () => {
  test.use({ storageState: "e2e/.auth/user-to-edit-tasks.json" });

  test("should change the task status to completed if the task is uncompleted and the 'Complete' button is clicked", async ({
    page,
  }) => {
    const task = MOCKED_TASKS.filter(
      (task, index) => task.status === "uncompleted" && index !== 0, // We don't want to edit the first task because it's used in the delete task test
    )[0];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("button", { name: en.task.toggleStatus.complete, exact: true })
      .click();

    await expect(
      page.getByRole("button", {
        name: en.task.toggleStatus.reopen,
        exact: true,
      }),
    ).toBeVisible();
    expect(await page.getByRole("checkbox").isChecked()).toBe(true);
  });

  test("should change the task status to uncompleted if the task is completed and the 'Reopen' button is clicked", async ({
    page,
  }) => {
    const task = MOCKED_TASKS.filter(
      (task, index) => task.status === "completed" && index !== 0,
    )[0];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("button", { name: en.task.toggleStatus.reopen, exact: true })
      .click();

    await expect(
      page.getByRole("button", {
        name: en.task.toggleStatus.complete,
        exact: true,
      }),
    ).toBeVisible();
    expect(await page.getByRole("checkbox").isChecked()).toBe(false);
  });
});
