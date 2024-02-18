"use client";

import { GAP, MIN_DAY_WIDTH } from "./constants/picker-sizes.constant";
import DatePickerYears from "./date-picker-labels.component";
import { useHorizontalDatePicker } from "./hooks/use-horizontal-date-picker.hook";
import styles from "./horizontal-date-picker.module.css";
import PickDayButton from "./pick-day-button.component";

export type HorizontalDatePickerProps = {
  selectedDate: Date;
  dictionary: {
    daysListAriaLabel: string;
    months: string[];
    weekdays: string[];
  };
};

export default function HorizontalDatePicker({
  selectedDate,
  dictionary,
}: HorizontalDatePickerProps) {
  const {
    containerRef,
    daysToShow,
    monthLabels,
    yearLabels,
    slideRight,
    slideLeft,
  } = useHorizontalDatePicker(selectedDate, dictionary.months);

  return (
    <div
      style={
        {
          "--min-day-width": `${MIN_DAY_WIDTH}px`,
          "--gap": `${GAP}px`,
        } as React.CSSProperties
      }
      className={styles.horizontalDatePicker}
    >
      <button className={styles.sliderButton} onClick={slideLeft}>
        {"<"}
      </button>
      <DatePickerYears yearLabels={yearLabels} variant="year" />
      <DatePickerYears yearLabels={monthLabels} variant="month" />
      <ul
        aria-label={dictionary.daysListAriaLabel}
        className={styles.daysContainer}
        ref={containerRef}
      >
        {daysToShow.map(date => (
          <li key={date.toDateString()}>
            <PickDayButton
              date={date}
              selectedDate={selectedDate}
              weekdays={dictionary.weekdays}
            />
          </li>
        ))}
      </ul>
      <button className={styles.sliderButton} onClick={slideRight}>
        {">"}
      </button>
    </div>
  );
}
