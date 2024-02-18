import { useEffect, useRef, useState } from "react";
import {
  LONG_BREAK_FREQUENCY,
  PomodoroState,
  TimerState,
} from "../constants/pomodoro-state.constant";
import { getPomodoroTime } from "../utils/get-pomodoro-time.util";

const INITIAL_POMODORO_STATE = PomodoroState.FOCUS;
const INITIAL_TIMER_STATE = TimerState.IDLE;
const INITIAL_POMODORO_COUNT = 1;
const INITIAL_TIME_LEFT = getPomodoroTime(INITIAL_POMODORO_STATE);

const UPDATE_INTERVAL_TIME = 1000;

export function usePomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);
  const [pomodoroState, setPomodoroState] = useState(INITIAL_POMODORO_STATE);
  const [timerState, setTimerState] = useState(INITIAL_TIMER_STATE);
  const [pomodoroCount, setPomodoroCount] = useState(INITIAL_POMODORO_COUNT);

  const initialTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      intervalRef.current && clearInterval(intervalRef.current);
    },
    [],
  );

  const getNextPomodoroState = (
    pomodoroState: PomodoroState,
    pomodoroCount: number,
  ) => {
    if (pomodoroState !== PomodoroState.FOCUS) {
      return PomodoroState.FOCUS;
    }

    if (pomodoroCount % LONG_BREAK_FREQUENCY === 0) {
      return PomodoroState.LONG_BREAK;
    }

    return PomodoroState.SHORT_BREAK;
  };

  const startTimer = (onStateChange?: () => void) => {
    if (timerState === TimerState.RUNNING) {
      return;
    }

    initialTimeRef.current = Date.now();
    // If the timer is paused, we need to subtract the time left from the initial time
    if (timerState === TimerState.PAUSED) {
      initialTimeRef.current -= getPomodoroTime(pomodoroState) - timeLeft;
    }

    setTimerState(TimerState.RUNNING);

    // Due to the closure, we can't use the state directly in the setInterval callback
    // So we need to create a new object to store the state
    const intervalState = {
      state: pomodoroState,
      pomodoroCount,
    };

    const handleTimerUpdate = () => {
      if (!initialTimeRef.current) {
        initialTimeRef.current = Date.now();
      }

      const elapsedTime = Date.now() - initialTimeRef.current;
      const timeLeft = getPomodoroTime(intervalState.state) - elapsedTime;

      if (timeLeft > 500) {
        setTimeLeft(timeLeft);
        return;
      }

      const newPomodoroCount =
        intervalState.state === PomodoroState.FOCUS
          ? intervalState.pomodoroCount
          : intervalState.pomodoroCount + 1;

      const newState = getNextPomodoroState(
        intervalState.state,
        intervalState.pomodoroCount,
      );

      const newTimeLeft = getPomodoroTime(newState);

      setTimeLeft(newTimeLeft);
      setPomodoroState(newState);
      setPomodoroCount(newPomodoroCount);

      initialTimeRef.current = Date.now();

      intervalState.state = newState;
      intervalState.pomodoroCount = newPomodoroCount;

      onStateChange?.();
    };

    intervalRef.current = setInterval(handleTimerUpdate, UPDATE_INTERVAL_TIME);
  };

  const pauseTimer = () => {
    if (timerState !== TimerState.RUNNING) {
      return;
    }

    intervalRef.current && clearInterval(intervalRef.current);

    setTimerState(TimerState.PAUSED);
  };

  const resetCurrentTimer = () => {
    intervalRef.current && clearInterval(intervalRef.current);

    setTimerState(TimerState.IDLE);
    setTimeLeft(getPomodoroTime(pomodoroState));
  };

  const resetTimer = () => {
    intervalRef.current && clearInterval(intervalRef.current);

    setTimerState(INITIAL_TIMER_STATE);
    setTimeLeft(INITIAL_TIME_LEFT);
    setPomodoroState(INITIAL_POMODORO_STATE);
    setPomodoroCount(INITIAL_POMODORO_COUNT);
  };

  return {
    timeLeft,
    pomodoroState,
    timerState,
    pomodoroCount,
    startTimer,
    pauseTimer,
    resetCurrentTimer,
    resetTimer,
  };
}
