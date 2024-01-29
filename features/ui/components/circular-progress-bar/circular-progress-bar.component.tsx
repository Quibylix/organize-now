import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import styles from "./circular-progress-bar.module.css";

export type CircularProgressProps = {
  progress: number;
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
};

export default function CircularProgressBar({
  progress,
  color = "primary",
}: CircularProgressProps) {
  const className = joinClassNames(
    styles.circularProgress,
    styles[`circularProgressColor__${color}`],
  );

  return (
    <svg
      width="250"
      height="250"
      viewBox="0 0 250 250"
      style={{ "--progress": progress } as React.CSSProperties}
      className={className}
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
