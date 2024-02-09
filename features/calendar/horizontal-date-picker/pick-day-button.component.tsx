import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import Link from "next/link";
import styles from "./horizontal-date-picker.module.css";

export type PickDayButtonProps = {
  date: Date;
  selectedDate: Date;
  weekdays: string[];
};

export default function PickDayButton({
  date,
  selectedDate,
  weekdays,
}: PickDayButtonProps) {
  const dateToCompare = new Date(date);

  const initialDayTimestamp = dateToCompare.setHours(0, 0, 0, 0);
  const finalDayTimestamp = dateToCompare.setHours(23, 59, 59, 999);

  const isSelected =
    dateToCompare.toDateString() === selectedDate.toDateString();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const isToday = dateToCompare.toDateString() === new Date().toDateString();

  const className = joinClassNames(styles.dayButton, {
    [styles.selectedDayButton]: isSelected,
    [styles.weekendDayButton]: isWeekend,
    [styles.todayDayButton]: isToday,
  });

  return (
    <Link
      className={className}
      href={`/calendar?min_ts=${initialDayTimestamp}&max_ts=${finalDayTimestamp}`}
    >
      <span className={styles.weekday}>{weekdays[date.getDay()]}</span>
      {date.getDate()}
    </Link>
  );
}
