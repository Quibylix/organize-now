import { MOCKED_TASKS } from "@/features/tasks/components/tasks/__mocks__/tasks.mock";
import test, { expect } from "@playwright/test";

test.describe("Tasks list | Logged in user with tasks", () => {
  test.use({ storageState: "e2e/.auth/user.json" });

  test("should display the tasks list the user has created", async ({
    page,
  }) => {
    await page.goto("/");

    const itemList = page.getByRole("list", { name: "Tasks list" });

    await expect(itemList).toBeVisible();

    const items = await itemList.getByRole("listitem").all();

    await Promise.all(
      items.map(async (item, index) => {
        const task = MOCKED_TASKS[index];

        await expect(item.getByText(task.name, { exact: true })).toBeVisible();
        await expect(
          item.getByText(task.datetime.toLocaleString(), { exact: true }),
        ).toBeVisible();
        await expect(
          item.getByText(task.category, { exact: true }),
        ).toBeVisible();
        await expect(
          item.getByText(task.priority.toString(), { exact: true }),
        ).toBeVisible();
      }),
    );
  });
});

test.describe("Tasks list | Logged in user without tasks", () => {
  test.use({ storageState: "e2e/.auth/user-without-tasks.json" });

  test("should display a message when there is no tasks", async ({ page }) => {
    await page.goto("/");

    const itemList = page.getByRole("list", { name: "Tasks list" });

    await expect(itemList).not.toBeVisible();

    const message = page.getByText("No tasks found");

    await expect(message).toBeVisible();
  });
});
