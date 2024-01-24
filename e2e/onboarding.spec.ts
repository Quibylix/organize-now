import en from "@/features/i18n/data/en.json" assert { "type": "json" };
import test, { expect } from "@playwright/test";

test("should render first step of onboarding", async ({ page }) => {
  await page.goto("/onboarding/1");

  const stepInfo = en.onboarding.step1;

  await expect(page.getByText(stepInfo.title)).toBeVisible();
  await expect(page.getByText(stepInfo.description)).toBeVisible();
});

test("should render second step of onboarding", async ({ page }) => {
  await page.goto("/onboarding/2");

  const stepInfo = en.onboarding.step2;

  await expect(page.getByText(stepInfo.title)).toBeVisible();
  await expect(page.getByText(stepInfo.description)).toBeVisible();
});

test("should render third step of onboarding", async ({ page }) => {
  await page.goto("/onboarding/3");

  const stepInfo = en.onboarding.step3;

  await expect(page.getByText(stepInfo.title)).toBeVisible();
  await expect(page.getByText(stepInfo.description)).toBeVisible();
});

test("should render a 404 page if the step does not exist", async ({
  page,
}) => {
  await page.goto("/onboarding/4");

  await expect(page.getByText("404")).toBeVisible();
});

test("should render a link to go to the next step", async ({ page }) => {
  await page.goto("/onboarding/1");

  await expect(
    page.getByRole("link", { name: en.onboarding.next }),
  ).toBeVisible();

  await page.getByRole("link", { name: en.onboarding.next }).click();

  await expect(page).toHaveURL("/onboarding/2");
});

test("should render a link with the text 'Get Started' on the last step and it should navigate to /", async ({
  page,
}) => {
  await page.goto("/onboarding/3");

  await page.getByRole("link", { name: en.onboarding.getStarted }).click();

  await expect(page).toHaveURL("/");
});

test("should render a link to go to the previous step", async ({ page }) => {
  await page.goto("/onboarding/2");

  await expect(
    page.getByRole("link", { name: en.onboarding.back }),
  ).toBeVisible();

  await page.getByRole("link", { name: en.onboarding.back }).click();

  await expect(page).toHaveURL("/onboarding/1");
});

test("should not render a link to go to the previous step on the first step", async ({
  page,
}) => {
  await page.goto("/onboarding/1");

  await expect(
    page.getByRole("link", { name: en.onboarding.back }),
  ).not.toBeVisible();
});

test("should render a link to skip the onboarding", async ({ page }) => {
  await page.goto("/onboarding/1");

  await expect(
    page.getByRole("link", { name: en.onboarding.skip }),
  ).toBeVisible();

  await page.getByRole("link", { name: en.onboarding.skip }).click();

  await expect(page).toHaveURL("/");
});
