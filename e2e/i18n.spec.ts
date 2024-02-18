import en from "@/features/i18n/data/en.json" assert { type: "json" };
import es from "@/features/i18n/data/es.json" assert { type: "json" };
import test, { expect } from "@playwright/test";

test.describe("Internationalization", () => {
  test("should render the page depending on the browser language", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(en.title);
  });

  test("should render a language picker", async ({ page }) => {
    await page.goto("/profile/change-language");

    await expect(
      page.getByText(en.changeLanguage.selectLanguage),
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "English",
        exact: true,
      }),
    ).toBeVisible();

    await expect(page.getByRole("listbox")).not.toBeVisible();

    await page
      .getByRole("button", {
        name: "English",
        exact: true,
      })
      .click();

    await expect(page.getByRole("listbox")).toBeVisible();
  });

  test("should allow the user to change the language", async ({ page }) => {
    await page.goto("/profile/change-language");

    await page
      .getByRole("button", {
        name: "English",
        exact: true,
      })
      .click();

    await page
      .getByRole("listbox")
      .getByRole("option", { name: "Español" })
      .click();

    await expect(
      page.getByText(es.changeLanguage.selectLanguage),
    ).toBeVisible();
  });
});
