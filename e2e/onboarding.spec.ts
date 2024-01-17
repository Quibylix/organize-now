import { STEPS_INFO } from "@/features/onboarding/components/onboarding-step/constants/steps-info.constant";
import test, { expect } from "@playwright/test";

test("should render first step of onboarding", async ({ page }) => {
  await page.goto("/onboarding/1");

  const stepInfo = STEPS_INFO[1];

  await expect(page.getByText(stepInfo.title)).toBeVisible();
  await expect(page.getByText(stepInfo.description)).toBeVisible();
});

test("should render second step of onboarding", async ({ page }) => {
  await page.goto("/onboarding/2");

  const stepInfo = STEPS_INFO[2];

  await expect(page.getByText(stepInfo.title)).toBeVisible();
  await expect(page.getByText(stepInfo.description)).toBeVisible();
});

test("should render third step of onboarding", async ({ page }) => {
  await page.goto("/onboarding/3");

  const stepInfo = STEPS_INFO[3];

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

  await expect(page.getByRole("link", { name: "Next" })).toBeVisible();

  await page.getByRole("link", { name: "Next" }).click();

  await expect(page).toHaveURL("/onboarding/2");
});

test("should render a link with the text 'Get Started' on the last step and it should navigate to /", async ({
  page,
}) => {
  await page.goto("/onboarding/3");

  await page.getByRole("link", { name: "Get Started" }).click();

  await expect(page).toHaveURL("/");
});

test("should render a link to go to the previous step", async ({ page }) => {
  await page.goto("/onboarding/2");

  await expect(page.getByRole("link", { name: "Back" })).toBeVisible();

  await page.getByRole("link", { name: "Back" }).click();

  await expect(page).toHaveURL("/onboarding/1");
});

test("should not render a link to go to the previous step on the first step", async ({
  page,
}) => {
  await page.goto("/onboarding/1");

  await expect(page.getByRole("link", { name: "Previous" })).not.toBeVisible();
});

test("should render a link to skip the onboarding", async ({ page }) => {
  await page.goto("/onboarding/1");

  await expect(page.getByRole("link", { name: "Skip" })).toBeVisible();

  await page.getByRole("link", { name: "Skip" }).click();

  await expect(page).toHaveURL("/");
});
