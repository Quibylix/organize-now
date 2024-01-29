import { PomodoroState } from "../constants/pomodoro-state.constant";
import { getPomodoroTime } from "./get-pomodoro-time.util";

export function calculatePomodoroProgress(
  leftTime: number,
  pomodoroState: PomodoroState,
) {
  return 100 - (leftTime * 100) / getPomodoroTime(pomodoroState);
}
