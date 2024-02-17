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
