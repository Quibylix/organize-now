import en from "@/features/i18n/data/en.json" assert { type: "json" };
import { MOCKED_TASKS } from "@/features/tasks/components/tasks/__mocks__/tasks.mock";
import test, { expect } from "@playwright/test";

const MOCKED_UNCOMPLETED_TASKS = MOCKED_TASKS.filter(
  ({ status }) => status === "uncompleted",
);
const MOCKED_COMPLETED_TASKS = MOCKED_TASKS.filter(
  ({ status }) => status === "completed",
);

test.describe("Tasks list | Logged in user with tasks", () => {
  test.use({ storageState: "e2e/.auth/user.json" });

  test("should display a list of the tasks that the user has to do", async ({
    page,
  }) => {
    await page.goto("/");

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.uncompletedTasks,
      exact: true,
    });

    await expect(completedTasksList).toBeVisible();

    const items = await completedTasksList.getByRole("listitem").all();

    await Promise.all(
      items.map(async (item, index) => {
        const task = MOCKED_UNCOMPLETED_TASKS[index];

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

  test("should display a list of the tasks that the user has completed", async ({
    page,
  }) => {
    await page.goto("/");

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.completedTasks,
      exact: true,
    });

    await expect(completedTasksList).toBeVisible();

    const items = await completedTasksList.getByRole("listitem").all();

    await Promise.all(
      items.map(async (item, index) => {
        const task = MOCKED_COMPLETED_TASKS[index];

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

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.completedTasks,
      exact: true,
    });
    const uncompletedTasksList = page.getByRole("list", {
      name: en.tasks.uncompletedTasks,
    });

    const items = [
      ...(await completedTasksList.getByRole("listitem").all()),
      ...(await uncompletedTasksList.getByRole("listitem").all()),
    ];

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

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.completedTasks,
      exact: true,
    });
    const uncompletedTasksList = page.getByRole("list", {
      name: en.tasks.uncompletedTasks,
    });

    const items = [
      ...(await completedTasksList.getByRole("listitem").all()),
      ...(await uncompletedTasksList.getByRole("listitem").all()),
    ];

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

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.completedTasks,
      exact: true,
    });
    const uncompletedTasksList = page.getByRole("list", {
      name: en.tasks.uncompletedTasks,
    });

    const items = [
      ...(await completedTasksList.getByRole("listitem").all()),
      ...(await uncompletedTasksList.getByRole("listitem").all()),
    ];

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

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.completedTasks,
      exact: true,
    });
    const uncompletedTasksList = page.getByRole("list", {
      name: en.tasks.uncompletedTasks,
    });

    const items = [
      ...(await completedTasksList.getByRole("listitem").all()),
      ...(await uncompletedTasksList.getByRole("listitem").all()),
    ];

    await Promise.all(
      items.map(async item => {
        await expect(item.getByRole("checkbox")).toBeChecked();
      }),
    );
  });

  test("should allow the user to filter the tasks by timestamp using the url", async ({
    page,
  }) => {
    const task = MOCKED_TASKS[0];

    const taskYear = task.datetime.getFullYear();
    const taskMonth = task.datetime.getMonth();
    const taskDay = task.datetime.getDate();

    const minTimestmap = new Date(taskYear, taskMonth, taskDay).getTime();
    const maxTimestmap = new Date(taskYear, taskMonth, taskDay + 1).getTime();

    await page.goto(`/?min_ts=${minTimestmap}&max_ts=${maxTimestmap}`);

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.completedTasks,
      exact: true,
    });
    const uncompletedTasksList = page.getByRole("list", {
      name: en.tasks.uncompletedTasks,
    });

    const items = [
      ...(await completedTasksList.getByRole("listitem").all()),
      ...(await uncompletedTasksList.getByRole("listitem").all()),
    ];

    await Promise.all(
      items.map(async item => {
        await expect(
          item.getByText(task.datetime.toLocaleString()),
        ).toBeVisible();
      }),
    );
  });

  test("should allow the user to search for tasks by name using the search bar", async ({
    page,
  }) => {
    await page.goto("/");

    const searchInput = page.getByRole("searchbox", { name: "search" });

    await searchInput.fill("Task 1");

    await expect(page).toHaveURL("/?search=Task+1");

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.completedTasks,
      exact: true,
    });
    const uncompletedTasksList = page.getByRole("list", {
      name: en.tasks.uncompletedTasks,
    });

    const items = [
      ...(await completedTasksList.getByRole("listitem").all()),
      ...(await uncompletedTasksList.getByRole("listitem").all()),
    ];

    await Promise.all(
      items.map(async item => {
        await expect(item.getByText("Task 1")).toBeVisible();
      }),
    );
  });
});

test.describe("Tasks list | Logged in user without tasks", () => {
  test.use({ storageState: "e2e/.auth/user-without-tasks.json" });

  test("should display a message when there is no tasks", async ({ page }) => {
    await page.goto("/");

    const completedTasksList = page.getByRole("list", {
      name: en.tasks.completedTasks,
    });
    const uncompletedTasksList = page.getByRole("list", {
      name: en.tasks.uncompletedTasks,
    });

    await expect(completedTasksList).not.toBeVisible();
    await expect(uncompletedTasksList).not.toBeVisible();

    const message = page.getByText(en.tasks.whatDoYouWantToDo);

    await expect(message).toBeVisible();
  });
});
