import { expect, test } from "@playwright/test";

test("should render a navbar", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("navigation")).toBeVisible();
});
