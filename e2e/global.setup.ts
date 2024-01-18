import { prepareDatabaseForTest } from "@/scripts/prepareDatabaseForTest";
import { chromium, expect } from "@playwright/test";

export default async function globalSetup() {
  await prepareDatabaseForTest();

  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:3000",
  });
  const page = await context.newPage();

  await page.context().storageState({ path: "e2e/.auth/no-user.json" });

  // User with tasks
  await page.goto("/login");

  await page.getByLabel("Username").fill("Username");
  await page.getByLabel("Password", { exact: true }).fill("Password1234");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("/");

  await page.context().storageState({ path: "e2e/.auth/user.json" });

  // User without tasks
  await page.goto("/login");

  await page.getByLabel("Username").fill("Username2");
  await page.getByLabel("Password", { exact: true }).fill("Password1234");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("/");

  await page
    .context()
    .storageState({ path: "e2e/.auth/user-without-tasks.json" });

  await browser.close();
}
