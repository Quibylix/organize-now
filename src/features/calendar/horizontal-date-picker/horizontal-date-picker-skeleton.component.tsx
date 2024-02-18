import { GAP, MIN_DAY_WIDTH } from "./constants/picker-sizes.constant";
import styles from "./horizontal-date-picker.module.css";

export default function HorizontalDatePickerSkeleton() {
  return (
    <div
      style={
        {
          "--min-day-width": `${MIN_DAY_WIDTH}px`,
          "--gap": `${GAP}px`,
        } as React.CSSProperties
      }
      className={styles.datePickerSkeleton}
      role="presentation"
    >
      <div className={styles.sliderButtonSkeleton} />
      <div className={styles.yearLabelSkeleton} />
      <div className={styles.monthLabelSkeleton} />
      <ul className={styles.daysSkeleton}>
        {Array.from({ length: 12 }).map((_, index) => (
          <li className={styles.daySkeleton} key={index} />
        ))}
      </ul>
      <div className={styles.sliderButtonSkeleton} />
    </div>
  );
}
