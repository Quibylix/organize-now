import test, { expect } from "@playwright/test";

test.use({ storageState: "e2e/.auth/no-user.json" });

test("should display an error message if the username does not have the required length", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Username").fill("a");

  await expect(
    page.getByText("Username must be between 3 and 20 characters"),
  ).toBeVisible();
});

test("should display an error message if the username has characters other than letters, numbers, and underscores", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Username").fill("test@");

  await expect(
    page.getByText(
      "Username must only contain letters, numbers, and underscores",
    ),
  ).toBeVisible();
});

test("should display an error message if the password does not have the required length", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Password", { exact: true }).fill("a");

  await expect(
    page.getByText("Password must be between 8 and 50 characters"),
  ).toBeVisible();
});

test("should display an error message if the password does not have an uppercase letter", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Password", { exact: true }).fill("test1234");

  await expect(
    page.getByText("Password must contain at least one uppercase letter"),
  ).toBeVisible();
});

test("should display an error message if the password does not have a lowercase letter", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Password", { exact: true }).fill("TEST1234");

  await expect(
    page.getByText("Password must contain at least one lowercase letter"),
  ).toBeVisible();
});

test("should display an error message if the password does not have a number", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Password", { exact: true }).fill("TestTest");

  await expect(
    page.getByText("Password must contain at least one number"),
  ).toBeVisible();
});

test("should display an error message if the password confirmation does not match the password", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Password", { exact: true }).fill("Test1234");
  await page.getByLabel("Confirm Password").fill("Test12345");

  await expect(page.getByText("Passwords do not match")).toBeVisible();
});

test("should not display any error messages if the username and password are valid", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Username").fill("test");
  await page.getByLabel("Password", { exact: true }).fill("Test1234");
  await page.getByLabel("Confirm Password").fill("Test1234");

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

test("Should display an error message if the username is already taken", async ({
  page,
}) => {
  await page.goto("/register");

  // The username is already taken because of the prepareDatabaseForTest function
  await page.getByLabel("Username").fill("Username");
  await page.getByLabel("Password", { exact: true }).fill("Test1234");
  await page.getByLabel("Confirm Password").fill("Test1234");

  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("Username already taken")).toBeVisible();
});

test("should allow the user to register and redirect to the onboarding page", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("Username").fill("unused_username");
  await page.getByLabel("Password", { exact: true }).fill("Test1234");
  await page.getByLabel("Confirm Password").fill("Test1234");

  await page.getByRole("button", { name: "Register" }).click();

  await expect(page).toHaveURL("/onboarding/1");
});
