import en from "@/features/i18n/data/en.json" assert { type: "json" };
import { MOCKED_TASKS } from "@/features/tasks/components/tasks/__mocks__/tasks.mock";
import { dateToDatetimeLocalValue } from "@/features/tasks/utils/date-to-datetime-local-value/date-to-datetime-local-value.util";
import { datetimeLocalValueToDate } from "@/features/tasks/utils/datetime-local-value-to-date/datetime-local-value-to-date.util";
import test, { expect } from "@playwright/test";

const deletedTaskIndex = 0;
const uncompletedTaskIndex = MOCKED_TASKS.findIndex(
  (task, index) => task.status === "uncompleted" && index !== deletedTaskIndex,
);
const completedTaskIndex = MOCKED_TASKS.findIndex(
  (task, index) => task.status === "completed" && index !== deletedTaskIndex,
);
const editedTaskIndex = uncompletedTaskIndex;

test.describe("Delete task", () => {
  test.use({ storageState: "e2e/.auth/user-to-edit-tasks.json" });

  test("clicking on the delete task button should display a confirmation dialog", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[deletedTaskIndex];

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
    const task = MOCKED_TASKS[deletedTaskIndex];

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
    const task = MOCKED_TASKS[uncompletedTaskIndex];

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
    const task = MOCKED_TASKS[completedTaskIndex];

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

  test("should render the form with inputs for name, description, datetime, priority, and category", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    await expect(
      page.getByLabel(en.editTask.form.nameLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByLabel(en.editTask.form.descriptionLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByLabel(en.editTask.form.datetimeLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(en.editTask.form.priorityLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByLabel(en.editTask.form.categoryLabel, { exact: true }),
    ).toBeVisible();
  });

  test("should render the submit button", async ({ page }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    await expect(
      page.getByRole("button", {
        name: en.editTask.form.submitButton,
        exact: true,
      }),
    ).toBeVisible();
  });

  test("should render the current task values in the form inputs", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    await expect(
      page.getByLabel(en.editTask.form.nameLabel, { exact: true }),
    ).toHaveValue(task.name);
    await expect(
      page.getByLabel(en.editTask.form.descriptionLabel, { exact: true }),
    ).toHaveValue(task.description);
    await expect(
      page.getByLabel(en.editTask.form.datetimeLabel, { exact: true }),
    ).toHaveValue(dateToDatetimeLocalValue(task.datetime));
    await expect(
      page.getByLabel(task.priority.toString(), { exact: true }),
    ).toBeChecked();
    await expect(
      page.getByLabel(en.editTask.form.categoryLabel, { exact: true }),
    ).toHaveValue(task.category);
  });

  test("should render an error message if the name input is invalid", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    const nameInput = page.getByLabel(en.editTask.form.nameLabel, {
      exact: true,
    });
    await nameInput.fill("");

    await expect(
      page.getByText("Name must not be empty", { exact: true }),
    ).toBeVisible();
  });

  test("should render an error message if the datetime-local input is invalid", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    const datetimeInput = page.getByLabel(en.editTask.form.datetimeLabel, {
      exact: true,
    });
    await datetimeInput.fill("");

    await expect(
      page.getByText("Invalid datetime", { exact: true }),
    ).toBeVisible();
  });

  test("should render an  error message if the datetime-local input is in the past", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    const datetimeInput = page.getByLabel(en.editTask.form.datetimeLabel, {
      exact: true,
    });
    await datetimeInput.fill("2021-01-01T00:00");

    await expect(
      page.getByText("Datetime must be in the future", { exact: true }),
    ).toBeVisible();
  });

  test("should render an error message if the category input is invalid", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    const categoryLabel = page.getByLabel(en.editTask.form.categoryLabel, {
      exact: true,
    });
    await categoryLabel.fill("");

    await expect(
      page.getByText("Category must not be empty", { exact: true }),
    ).toBeVisible();
  });

  test("should render all error messages on form submit", async ({ page }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    const nameInput = page.getByLabel(en.editTask.form.nameLabel, {
      exact: true,
    });
    await nameInput.fill("");

    const datetimeInput = page.getByLabel(en.editTask.form.datetimeLabel, {
      exact: true,
    });
    await datetimeInput.fill("");

    const categoryLabel = page.getByLabel(en.editTask.form.categoryLabel, {
      exact: true,
    });
    await categoryLabel.fill("");

    const submitButton = page.getByRole("button", {
      name: en.editTask.form.submitButton,
      exact: true,
    });
    await submitButton.click();

    await expect(
      page.getByText("Name must not be empty", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Invalid datetime", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Category must not be empty", { exact: true }),
    ).toBeVisible();
  });

  test("should edit the task", async ({ page }) => {
    const task = MOCKED_TASKS[editedTaskIndex];

    await page.goto("/");

    await page.getByRole("link", { name: task.name, exact: true }).click();

    await page
      .getByRole("link", { name: en.task.editTask, exact: true })
      .click();

    await page.waitForURL(/task\/edit\/\d+/);

    const taskId = Number(page.url().split("/").pop());

    const futureDate = dateToDatetimeLocalValue(
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    );

    await page
      .getByLabel(en.editTask.form.nameLabel, { exact: true })
      .fill("New task");
    await page
      .getByLabel(en.editTask.form.descriptionLabel, { exact: true })
      .fill("New Description");
    await page
      .getByLabel(en.editTask.form.datetimeLabel, { exact: true })
      .fill(futureDate);
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page
      .getByLabel(en.editTask.form.categoryLabel, { exact: true })
      .fill("New Category");

    await page
      .getByRole("button", {
        name: en.editTask.form.submitButton,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(`/task/${taskId}`);

    await expect(page.getByText("New task", { exact: true })).toBeVisible();
    await expect(
      page.getByText("New Description", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(datetimeLocalValueToDate(futureDate).toLocaleString(), {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText("1", { exact: true })).toBeVisible();
    await expect(page.getByText("New Category", { exact: true })).toBeVisible();
  });
});
