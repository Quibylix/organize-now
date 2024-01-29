import en from "@/features/i18n/data/en.json";
import { act, render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, it, vi } from "vitest";
import {
  FOCUS_TIME,
  SHORT_BREAK_TIME,
} from "./constants/pomodoro-time.constant";
import PomodoroTimer from "./pomodoro-timer.component";
import { formatTime } from "./utils/format-time.util";

const dictionary = en.focus.timer;

describe("PomodoroTimer", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should render the timer", () => {
    render(<PomodoroTimer dictionary={dictionary} />);
  });

  it("should render the left time, the pomodoro state and the pomodoro count", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    screen.getByText(dictionary.state.focus);
    screen.getByText(formatTime(FOCUS_TIME));
    screen.getByText("# 1");
  });

  it("should render the buttons: start, reset and reset all", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    screen.getByRole("button", { name: dictionary.start });
    screen.getByRole("button", { name: dictionary.reset });
    screen.getByRole("button", { name: dictionary.resetAll });
  });

  it("should render the pause button when the timer is running", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    const startButton = screen.getByRole("button", { name: dictionary.start });

    act(() => startButton.click());

    screen.getByRole("button", { name: dictionary.pause });
  });

  it("should update the left time when the timer is running", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    const startButton = screen.getByRole("button", { name: dictionary.start });

    act(() => startButton.click());

    screen.getByText(formatTime(FOCUS_TIME));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    screen.getByText(formatTime(FOCUS_TIME - 1000));
  });

  it("should change the pomodoro state when the focus time ends", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    const startButton = screen.getByRole("button", { name: dictionary.start });

    act(() => startButton.click());

    screen.getByText(dictionary.state.focus);

    act(() => {
      vi.advanceTimersByTime(FOCUS_TIME);
    });

    screen.getByText(dictionary.state.shortBreak);
  });

  it("should change the pomodoro state when the short break time ends", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    const startButton = screen.getByRole("button", { name: dictionary.start });

    act(() => startButton.click());

    screen.getByText(dictionary.state.focus);

    act(() => {
      vi.advanceTimersByTime(FOCUS_TIME);
    });

    screen.getByText(dictionary.state.shortBreak);

    act(() => {
      vi.advanceTimersByTime(SHORT_BREAK_TIME);
    });

    screen.getByText(dictionary.state.focus);
  });

  it("should render the long break state when the pomodoro count is 4", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    const startButton = screen.getByRole("button", { name: dictionary.start });

    act(() => startButton.click());

    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(FOCUS_TIME);
      });

      act(() => {
        vi.advanceTimersByTime(SHORT_BREAK_TIME);
      });
    }

    act(() => {
      vi.advanceTimersByTime(FOCUS_TIME);
    });

    screen.getByText(dictionary.state.longBreak);
  });

  it("should reset the current timer when the reset button is clicked", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    const startButton = screen.getByRole("button", { name: dictionary.start });

    act(() => startButton.click());

    act(() => {
      vi.advanceTimersByTime(FOCUS_TIME);
    });

    screen.getByText(dictionary.state.shortBreak);

    const resetButton = screen.getByRole("button", { name: dictionary.reset });

    act(() => resetButton.click());

    screen.getByText(dictionary.state.shortBreak);
    screen.getByText(formatTime(SHORT_BREAK_TIME));
  });

  it("should reset the timer when the reset all button is clicked", () => {
    render(<PomodoroTimer dictionary={dictionary} />);

    const startButton = screen.getByRole("button", { name: dictionary.start });

    act(() => startButton.click());

    act(() => {
      vi.advanceTimersByTime(FOCUS_TIME);
    });

    screen.getByText(dictionary.state.shortBreak);

    const resetAllButton = screen.getByRole("button", {
      name: dictionary.resetAll,
    });

    act(() => resetAllButton.click());

    screen.getByText(dictionary.state.focus);
    screen.getByText(formatTime(FOCUS_TIME));
    screen.getByText("# 1");
  });
});
