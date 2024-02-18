import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import styles from "./horizontal-date-picker.module.css";

export type DatePickerLabelsProps = {
  yearLabels: { label: string; left: number }[];
  variant: "year" | "month";
};

export default function DatePickerLabels({
  yearLabels,
  variant,
}: DatePickerLabelsProps) {
  const containerClassName = joinClassNames({
    [styles.yearsContainer]: variant === "year",
    [styles.monthsContainer]: variant === "month",
  });

  const labelClassName = joinClassNames({
    [styles.yearLabel]: variant === "year",
    [styles.monthLabel]: variant === "month",
  });

  return (
    <div className={containerClassName}>
      {yearLabels.map(({ label, left }, index) => (
        <div
          key={index}
          className={labelClassName}
          style={
            {
              "--left": `${left}px`,
            } as React.CSSProperties
          }
        >
          {label}
        </div>
      ))}
    </div>
  );
}
