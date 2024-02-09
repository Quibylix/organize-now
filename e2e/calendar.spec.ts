import en from "@/features/i18n/data/en.json" assert { type: "json" };
import { dateToDatetimeLocalValue } from "@/features/tasks/utils/date-to-datetime-local-value/date-to-datetime-local-value.util";
import test, { expect } from "@playwright/test";

test.describe("Calendar", () => {
  test("should render a day picker with the current date", async ({ page }) => {
    await page.goto("/calendar");

    const today = new Date();
    const day = today.getDate();
    const month = en.calendar.months[today.getMonth()];
    const year = today.getFullYear();
    const weekday = en.calendar.weekdays[today.getDay()];

    await expect(
      page.getByRole("link", {
        name: `${weekday} ${day.toString()}`,
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText(month, { exact: true })).toBeVisible();
    await expect(
      page.getByText(year.toString(), { exact: true }),
    ).toBeVisible();
  });

  test("should render buttons to navigate to the previous and next days", async ({
    page,
  }) => {
    await page.goto("/calendar");

    await expect(page.getByRole("button", { name: "<" })).toBeVisible();
    await expect(page.getByRole("button", { name: ">" })).toBeVisible();
  });

  test("should redirect to a timestamp filtered calendar url when clicking on a day", async ({
    page,
  }) => {
    await page.goto("/calendar");

    await expect(
      page.getByRole("list", {
        name: en.calendar.daysListAriaLabel,
        exact: true,
      }),
    ).toBeVisible();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await page
      .getByRole("link", {
        name: `${
          en.calendar.weekdays[tomorrow.getDay()]
        } ${tomorrow.getDate()}`,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(
      `/calendar?min_ts=${tomorrow.setHours(
        0,
        0,
        0,
        0,
      )}&max_ts=${tomorrow.setHours(23, 59, 59, 999)}`,
    );
  });

  test.describe("Calendar | Using the user to edit tasks", () => {
    test.use({ storageState: "e2e/.auth/user-to-edit-tasks.json" });

    test("should render only the tasks of the selected day", async ({
      page,
    }) => {
      // Adding a task for tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await page.goto("/new-task");

      await page
        .getByLabel(en.addTask.form.nameLabel, { exact: true })
        .fill("New task");
      await page
        .getByLabel(en.addTask.form.descriptionLabel, { exact: true })
        .fill("Description");
      await page
        .getByLabel(en.addTask.form.datetimeLabel, { exact: true })
        .fill(dateToDatetimeLocalValue(tomorrow));
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

      await page.goto("/calendar");

      await expect(
        page.getByText("New task", { exact: true }),
      ).not.toBeVisible();

      await expect(
        page.getByRole("list", {
          name: en.calendar.daysListAriaLabel,
          exact: true,
        }),
      ).toBeVisible();

      await page
        .getByRole("link", {
          name: `${
            en.calendar.weekdays[tomorrow.getDay()]
          } ${tomorrow.getDate()}`,
          exact: true,
        })
        .click();

      await expect(page).toHaveURL(
        `/calendar?min_ts=${tomorrow.setHours(
          0,
          0,
          0,
          0,
        )}&max_ts=${tomorrow.setHours(23, 59, 59, 999)}`,
      );

      await expect(page.getByText("New task", { exact: true })).toBeVisible();
    });
  });
});
