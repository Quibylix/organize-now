import en from "@/features/i18n/data/en.json" assert { "type": "json" };
import test, { expect } from "@playwright/test";

test.use({ storageState: "e2e/.auth/no-user.json" });

test("should display an error message if the username does not have the required length", async ({
  page,
}) => {
  await page.goto("/login");

  await page.getByLabel(en.login.form.usernameLabel, { exact: true }).fill("a");

  await expect(
    page.getByText("Username must be between 3 and 20 characters"),
  ).toBeVisible();
});

test("should display an error message if the username has characters other than letters, numbers, and underscores", async ({
  page,
}) => {
  await page.goto("/login");

  await page
    .getByLabel(en.login.form.usernameLabel, { exact: true })
    .fill("test@");

  await expect(
    page.getByText(
      "Username must only contain letters, numbers, and underscores",
    ),
  ).toBeVisible();
});

test("should display an error message if the password does not have the required length", async ({
  page,
}) => {
  await page.goto("/login");

  await page.getByLabel(en.login.form.passwordLabel, { exact: true }).fill("a");

  await expect(
    page.getByText("Password must be between 8 and 50 characters"),
  ).toBeVisible();
});

test("should display an error message if the password does not have an uppercase letter", async ({
  page,
}) => {
  await page.goto("/login");

  await page
    .getByLabel(en.login.form.passwordLabel, { exact: true })
    .fill("test1234");

  await expect(
    page.getByText("Password must contain at least one uppercase letter"),
  ).toBeVisible();
});

test("should display an error message if the password does not have a lowercase letter", async ({
  page,
}) => {
  await page.goto("/login");

  await page
    .getByLabel(en.login.form.passwordLabel, { exact: true })
    .fill("TEST1234");

  await expect(
    page.getByText("Password must contain at least one lowercase letter"),
  ).toBeVisible();
});

test("should display an error message if the password does not have a number", async ({
  page,
}) => {
  await page.goto("/login");

  await page
    .getByLabel(en.login.form.passwordLabel, { exact: true })
    .fill("TestTest");

  await expect(
    page.getByText("Password must contain at least one number"),
  ).toBeVisible();
});

test("should not display any error messages if the username and password are valid", async ({
  page,
}) => {
  await page.goto("/login");

  await page
    .getByLabel(en.login.form.usernameLabel, { exact: true })
    .fill("test");
  await page
    .getByLabel(en.login.form.passwordLabel, { exact: true })
    .fill("Test1234");

  await expect(
    page.getByText("Username must be between 3 and 20 characters"),
  ).not.toBeVisible();
  await expect(
    page.getByText(
      "Username must only contain letters, numbers, and underscores",
    ),
  ).not.toBeVisible();
  await expect(
    page.getByText("Password must be between 8 and 50 characters"),
  ).not.toBeVisible();
  await expect(
    page.getByText("Password must contain at least one uppercase letter"),
  ).not.toBeVisible();
  await expect(
    page.getByText("Password must contain at least one lowercase letter"),
  ).not.toBeVisible();
  await expect(
    page.getByText("Password must contain at least one number"),
  ).not.toBeVisible();
  await expect(page.getByText("Passwords do not match")).not.toBeVisible();
});

test("Should render a message error if the username or the password are not valid", async ({
  page,
}) => {
  await page.goto("/login");

  await page
    .getByLabel(en.login.form.usernameLabel, { exact: true })
    .fill("Username");
  await page
    .getByLabel(en.login.form.passwordLabel, { exact: true })
    .fill("Password12345");

  await page
    .getByRole("button", { name: en.login.form.submitButton, exact: true })
    .click();

  await expect(page.getByText("Invalid username or password")).toBeVisible();
});

test("should allow the user to login", async ({ page }) => {
  await page.goto("/login");

  await page
    .getByLabel(en.login.form.usernameLabel, { exact: true })
    .fill("Username");
  await page
    .getByLabel(en.login.form.passwordLabel, { exact: true })
    .fill("Password1234");

  await page
    .getByRole("button", { name: en.login.form.submitButton, exact: true })
    .click();

  await expect(page).toHaveURL("/");
});
