import en from "@/features/i18n/data/en.json" assert { type: "json" };
import { MOCKED_TASKS } from "@/features/tasks/components/tasks/__mocks__/tasks.mock";
import test, { expect } from "@playwright/test";

test.describe("Profile", () => {
  test("should display the user account name, profile image, tasks left and tasks completed", async ({
    page,
  }) => {
    await page.goto("/profile");

    const tasksLeft = MOCKED_TASKS.filter(
      task => task.status === "uncompleted",
    ).length;
    const tasksDone = MOCKED_TASKS.filter(
      task => task.status === "completed",
    ).length;

    await expect(page.getByText("Account Name", { exact: true })).toBeVisible();
    await expect(
      page.getByAltText(en.profile.profileImageAlt, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(`${en.profile.tasksLeft}: ${tasksLeft}`, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(`${en.profile.tasksDone}: ${tasksDone}`, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test("should display a link to logout", async ({ page }) => {
    await page.goto("/profile");

    await expect(
      page.getByRole("link", { name: en.profile.logout, exact: true }),
    ).toBeVisible();
  });
});

test.describe("Change account name", () => {
  test.use({ storageState: "e2e/.auth/user-to-edit-tasks.json" });

  test("should display the current account name and a form to change it", async ({
    page,
  }) => {
    await page.goto("/profile/change-account-name");

    const inputField = page.getByLabel(en.changeAccountName.accountNameLabel, {
      exact: true,
    });

    await expect(inputField).toBeVisible();
    expect(await inputField.inputValue()).toBe("Account Name 4");
  });

  test("should display a button to submit the new account name", async ({
    page,
  }) => {
    await page.goto("/profile/change-account-name");

    await expect(
      page.getByRole("button", { name: en.changeAccountName.submitButton }),
    ).toBeVisible();
  });

  test("should display an error message if the account name is empty", async ({
    page,
  }) => {
    await page.goto("/profile/change-account-name");

    const inputField = page.getByLabel(en.changeAccountName.accountNameLabel, {
      exact: true,
    });

    await inputField.fill("");
    await inputField.blur();

    await expect(
      page.getByText("Account name must not be empty", { exact: true }),
    ).toBeVisible();
  });

  test("should change the account name when the form is submitted", async ({
    page,
  }) => {
    await page.goto("/profile/change-account-name");

    const inputField = page.getByLabel(en.changeAccountName.accountNameLabel, {
      exact: true,
    });

    await inputField.fill("New Account Name");

    await page
      .getByRole("button", { name: en.changeAccountName.submitButton })
      .click();

    await page.waitForURL("/profile");

    await expect(
      page.getByText("New Account Name", { exact: true }),
    ).toBeVisible();
  });
});
