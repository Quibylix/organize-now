import en from "@/features/i18n/data/en.json" assert { type: "json" };
import test, { expect } from "@playwright/test";

test.describe("Add task", () => {
  test.use({ storageState: "e2e/.auth/user-to-add-tasks.json" });

  test("should render the form with inputs for name, description, datetime, priority, and category", async ({
    page,
  }) => {
    await page.goto("/new-task");

    await expect(
      page.getByLabel(en.addTask.form.nameLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByLabel(en.addTask.form.descriptionLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByLabel(en.addTask.form.datetimeLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(en.addTask.form.priorityLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByLabel(en.addTask.form.categoryLabel, { exact: true }),
    ).toBeVisible();
  });

  test("should render the submit button", async ({ page }) => {
    await page.goto("/new-task");

    await expect(
      page.getByRole("button", {
        name: en.addTask.form.submitButton,
        exact: true,
      }),
    ).toBeVisible();
  });

  test("should render an error message if the name input is invalid", async ({
    page,
  }) => {
    await page.goto("/new-task");

    const nameInput = page.getByLabel(en.addTask.form.nameLabel, {
      exact: true,
    });

    await nameInput.focus();
    await nameInput.blur();

    await expect(
      page.getByText("Name must not be empty", { exact: true }),
    ).toBeVisible();
  });

  test("should render an error message if the datetime-local input is invalid", async ({
    page,
  }) => {
    await page.goto("/new-task");

    const datetimeInput = page.getByLabel(en.addTask.form.datetimeLabel, {
      exact: true,
    });

    await datetimeInput.focus();
    await datetimeInput.blur();

    await expect(
      page.getByText("Invalid datetime", { exact: true }),
    ).toBeVisible();
  });

  test("should render an  error message if the datetime-local input is in the past", async ({
    page,
  }) => {
    await page.goto("/new-task");

    const datetimeInput = page.getByLabel(en.addTask.form.datetimeLabel, {
      exact: true,
    });
    await datetimeInput.focus();
    await datetimeInput.fill("2021-01-01T00:00");
    await datetimeInput.blur();

    await expect(
      page.getByText("Datetime must be in the future", { exact: true }),
    ).toBeVisible();
  });

  test("should render an error message if the category input is invalid", async ({
    page,
  }) => {
    await page.goto("/new-task");

    const categoryLabel = page.getByLabel(en.addTask.form.categoryLabel, {
      exact: true,
    });

    await categoryLabel.focus();
    await categoryLabel.blur();

    await expect(
      page.getByText("Category must not be empty", { exact: true }),
    ).toBeVisible();
  });

  test("should render all of error messages on form submit", async ({
    page,
  }) => {
    await page.goto("/new-task");

    const submitButton = page.getByRole("button", {
      name: en.addTask.form.submitButton,
      exact: true,
    });
    await submitButton.click({ delay: 200 });

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

  test("should add a task", async ({ page }) => {
    await page.goto("/new-task");

    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
      .toISOString()
      .slice(0, -8);

    await page
      .getByLabel(en.addTask.form.nameLabel, { exact: true })
      .fill("New task");
    await page
      .getByLabel(en.addTask.form.descriptionLabel, { exact: true })
      .fill("Description");
    await page
      .getByLabel(en.addTask.form.datetimeLabel, { exact: true })
      .fill(futureDate);
    await page.getByLabel("1", { exact: true }).check();
    await page
      .getByLabel(en.addTask.form.categoryLabel, { exact: true })
      .fill("Category");

    await page
      .getByRole("button", {
        name: en.addTask.form.submitButton,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL("/");

    await expect(page.getByText("New task", { exact: true })).toBeVisible();
  });
});
