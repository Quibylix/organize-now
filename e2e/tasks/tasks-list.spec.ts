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

  test("should allow the user to filter the tasks list by category using the url", async ({
    page,
  }) => {
    await page.goto("/?category=category 1");

    const itemList = page.getByRole("list", { name: "Tasks list" });

    await expect(itemList).toBeVisible();

    const items = await itemList.getByRole("listitem").all();

    await Promise.all(
      items.map(async item => {
        await expect(item.getByText("category 1")).toBeVisible();
      }),
    );
  });

  test("should allow the user to filter the tasks list by priority using the url", async ({
    page,
  }) => {
    await page.goto("/?priority=9");

    const itemList = page.getByRole("list", { name: "Tasks list" });

    await expect(itemList).toBeVisible();

    const items = await itemList.getByRole("listitem").all();

    await Promise.all(
      items.map(async item => {
        await expect(item.getByText("9", { exact: true })).toBeVisible();
      }),
    );
  });

  test("should allow the user to filter the tasks by search using the url", async ({
    page,
  }) => {
    await page.goto("/?search=Task 1");

    const itemList = page.getByRole("list", { name: "Tasks list" });

    await expect(itemList).toBeVisible();

    const items = await itemList.getByRole("listitem").all();

    await Promise.all(
      items.map(async item => {
        await expect(item.getByText("Task 1")).toBeVisible();
      }),
    );
  });

  test("should allow the user to filter the tasks by status using the url", async ({
    page,
  }) => {
    await page.goto("/?status=completed");

    const itemList = page.getByRole("list", { name: "Tasks list" });

    await expect(itemList).toBeVisible();

    const items = await itemList.getByRole("listitem").all();

    await Promise.all(
      items.map(async item => {
        await expect(item.getByRole("checkbox")).toBeChecked();
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

    const message = page.getByText("What do you want to do today?");

    await expect(message).toBeVisible();
  });
});
