import { PomodoroState } from "../constants/pomodoro-state.constant";
import {
  FOCUS_TIME,
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
} from "../constants/pomodoro-time.constant";

export function getPomodoroTime(pomodoroState: PomodoroState) {
  switch (pomodoroState) {
    case PomodoroState.FOCUS:
      return FOCUS_TIME;
    case PomodoroState.SHORT_BREAK:
      return SHORT_BREAK_TIME;
    case PomodoroState.LONG_BREAK:
      return LONG_BREAK_TIME;
  }
}
