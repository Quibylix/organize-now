import styles from "./circular-progress-bar.module.css";

export type CircularProgressProps = {
  progress: number;
};

export default function CircularProgressBar({
  progress,
}: CircularProgressProps) {
  return (
    <svg
      width="250"
      height="250"
      viewBox="0 0 250 250"
      style={{ "--progress": progress } as React.CSSProperties}
      className={styles.circularProgress}
    >
      <circle
        cx="125"
        cy="125"
        r="120"
        strokeWidth="10"
        className={styles.bg}
      />
      <circle
        cx="125"
        cy="125"
        r="120"
        strokeWidth="10"
        className={styles.fg}
      />
    </svg>
  );
}
