"use client";

import Button from "@/features/ui/components/button/button.component";
import CircularProgressBar from "@/features/ui/components/circular-progress-bar/circular-progress-bar.component";
import { useEffect, useRef } from "react";
import { PomodoroState, TimerState } from "./constants/pomodoro-state.constant";
import { usePomodoroTimer } from "./hooks/use-pomodoro-timer.hook";
import styles from "./pomodoro-timer.module.css";
import { calculatePomodoroProgress } from "./utils/calculate-pomodoro-progress.util";
import { formatTime } from "./utils/format-time.util";

export type PomodoroTimerProps = {
  dictionary: {
    start: string;
    pause: string;
    reset: string;
    resetAll: string;
    stateLabel: string;
    state: {
      focus: string;
      shortBreak: string;
      longBreak: string;
    };
  };
};

export default function PomodoroTimer({ dictionary }: PomodoroTimerProps) {
  const getStateTranslation = (state: PomodoroState) => {
    switch (state) {
      case PomodoroState.FOCUS:
        return dictionary.state.focus;
      case PomodoroState.SHORT_BREAK:
        return dictionary.state.shortBreak;
      case PomodoroState.LONG_BREAK:
        return dictionary.state.longBreak;
    }
  };

  const {
    timeLeft,
    pomodoroState,
    timerState,
    pomodoroCount,
    startTimer,
    pauseTimer,
    resetCurrentTimer,
    resetTimer,
  } = usePomodoroTimer();

  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickAudioRef.current = new Audio("/audios/click-effect.mp3");
    alarmAudioRef.current = new Audio("/audios/alarm.mp3");
  }, []);

  const barProgress = 100 - calculatePomodoroProgress(timeLeft, pomodoroState);

  const color =
    pomodoroState === PomodoroState.FOCUS
      ? "primary"
      : pomodoroState === PomodoroState.SHORT_BREAK
        ? "success"
        : "danger";

  const onPomodoroStateChange = () => {
    alarmAudioRef.current?.play();
  };

  function clickWithAudio(fn: () => void) {
    return () => {
      clickAudioRef.current?.play();
      fn();
    };
  }

  return (
    <section className={styles.pomodoroTimer}>
      <div className={styles.wrapper}>
        <CircularProgressBar progress={barProgress} color={color} />
        <p role="timer" className={styles.timeLeft}>
          {formatTime(timeLeft)}
        </p>
      </div>
      <div className={styles.buttons}>
        {timerState !== TimerState.RUNNING ? (
          <Button
            size="lg"
            className={styles.mainButton}
            onClick={clickWithAudio(() => startTimer(onPomodoroStateChange))}
            color={color}
          >
            {dictionary.start}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="lg"
            className={styles.mainButton}
            onClick={clickWithAudio(pauseTimer)}
            color={color}
          >
            {dictionary.pause}
          </Button>
        )}
        <Button variant="text" onClick={resetCurrentTimer} color={color}>
          {dictionary.reset}
        </Button>
        <Button variant="text" onClick={resetTimer} color={color}>
          {dictionary.resetAll}
        </Button>
      </div>
      <p
        role="status"
        aria-label={dictionary.stateLabel}
        className={styles.pomodoroState}
      >
        {getStateTranslation(pomodoroState)}
      </p>
      <p role="status" className={styles.pomodoroCount}>
        # {pomodoroCount}
      </p>
    </section>
  );
}
