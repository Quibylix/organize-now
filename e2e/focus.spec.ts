import {
  FOCUS_TIME,
  SHORT_BREAK_TIME,
} from "@/features/focus/components/pomodoro-timer/constants/pomodoro-time.constant";
import { formatTime } from "@/features/focus/components/pomodoro-timer/utils/format-time.util";
import en from "@/features/i18n/data/en.json" assert { type: "json" };
import test, { expect } from "@playwright/test";
import sinon from "sinon";

declare const window: Window & { __clock: sinon.SinonFakeTimers };

test.describe("Focus", () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript({
      path: "node_modules/sinon/pkg/sinon.js",
    });

    await context.addInitScript(() => {
      window.__clock = sinon.useFakeTimers({
        now: 1483228800000,
        shouldAdvanceTime: true,
      });
    });
  });

  test("should render a timer with the left time, the pomodoro state and the pomodoro count", async ({
    page,
  }) => {
    await page.goto("/focus");

    await expect(page.getByRole("timer")).toHaveText(formatTime(FOCUS_TIME));
    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.focus);
    await expect(page.getByText("# 1")).toBeVisible();
  });

  test("should render the buttons: start, reset and reset all", async ({
    page,
  }) => {
    await page.goto("/focus");

    await expect(
      page.getByRole("button", { name: en.focus.timer.start, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: en.focus.timer.reset, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: en.focus.timer.resetAll, exact: true }),
    ).toBeVisible();
  });

  test("should render the pause button when the timer is running", async ({
    page,
  }) => {
    await page.goto("/focus");

    const startButton = page.getByRole("button", {
      name: en.focus.timer.start,
      exact: true,
    });

    await startButton.click();

    await expect(
      page.getByRole("button", { name: en.focus.timer.pause, exact: true }),
    ).toBeVisible();
  });

  test("should update the left time when the timer is running", async ({
    page,
  }) => {
    await page.goto("/focus");

    const startButton = page.getByRole("button", {
      name: en.focus.timer.start,
      exact: true,
    });

    await startButton.click();

    await expect(page.getByText(formatTime(FOCUS_TIME))).toBeVisible();

    await page.evaluate(() => window.__clock.tick(1000));

    await expect(page.getByText(formatTime(FOCUS_TIME - 1000))).toBeVisible();
  });

  test("should change the pomodoro state when the focus time ends", async ({
    page,
  }) => {
    await page.goto("/focus");

    const startButton = page.getByRole("button", {
      name: en.focus.timer.start,
      exact: true,
    });

    await startButton.click();

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.focus);

    await page.evaluate(time => window.__clock.tick(time), FOCUS_TIME);

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.shortBreak);
  });

  test("should change the pomodoro state when the short break time ends", async ({
    page,
  }) => {
    await page.goto("/focus");

    const startButton = page.getByRole("button", {
      name: en.focus.timer.start,
      exact: true,
    });

    await startButton.click();

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.focus);

    await page.evaluate(time => window.__clock.tick(time), FOCUS_TIME);

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.shortBreak);

    await page.evaluate(time => window.__clock.tick(time), SHORT_BREAK_TIME);

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.focus);
  });

  test("should render the long break state when the pomodoro count is 4", async ({
    page,
  }) => {
    await page.goto("/focus");

    const startButton = page.getByRole("button", {
      name: en.focus.timer.start,
      exact: true,
    });

    await startButton.click();

    for (let i = 0; i < 3; i++) {
      await page.evaluate(
        time => window.__clock.tick(time),
        FOCUS_TIME + SHORT_BREAK_TIME,
      );
    }

    await page.evaluate(time => window.__clock.tick(time), FOCUS_TIME);

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.longBreak);
  });

  test("should reset the current timer when the reset button is clicked", async ({
    page,
  }) => {
    await page.goto("/focus");

    const startButton = page.getByRole("button", {
      name: en.focus.timer.start,
      exact: true,
    });

    await startButton.click();

    await page.evaluate(time => window.__clock.tick(time), FOCUS_TIME);

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.shortBreak);

    const resetButton = page.getByRole("button", {
      name: en.focus.timer.reset,
      exact: true,
    });

    await resetButton.click();

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.shortBreak);

    await expect(page.getByRole("timer")).toHaveText(
      formatTime(SHORT_BREAK_TIME),
    );
  });

  test("should reset the timer when the reset all button is clicked", async ({
    page,
  }) => {
    await page.goto("/focus");

    const startButton = page.getByRole("button", {
      name: en.focus.timer.start,
      exact: true,
    });

    await startButton.click();

    await page.evaluate(time => window.__clock.tick(time), FOCUS_TIME);

    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.shortBreak);

    const resetAllButton = page.getByRole("button", {
      name: en.focus.timer.resetAll,
      exact: true,
    });

    await resetAllButton.click();

    await expect(page.getByRole("timer")).toHaveText(formatTime(FOCUS_TIME));
    await expect(
      page.getByRole("status", {
        name: en.focus.timer.stateLabel,
        exact: true,
      }),
    ).toHaveText(en.focus.timer.state.focus);
    await expect(page.getByText("# 1")).toBeVisible();
  });
});
