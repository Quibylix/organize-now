"use client";

import DatePicker from "@/features/calendar/horizontal-date-picker/horizontal-date-picker.component";
import { useEffect, useState } from "react";
import HorizontalDatePickerSkeleton from "../horizontal-date-picker/horizontal-date-picker-skeleton.component";

export type DatePickerWithSelectedDateProps = {
  timestamp?: {
    min: number;
    max: number;
  };
  dictionary: {
    months: string[];
    weekdays: string[];
    daysListAriaLabel: string;
  };
};

export default function DatePickerWithSelectedDate({
  timestamp,
  dictionary,
}: DatePickerWithSelectedDateProps) {
  const [date, setDate] = useState<null | Date>(null);

  useEffect(() => {
    if (!timestamp) {
      return setDate(new Date());
    }

    const date = new Date((timestamp.min + timestamp.max) / 2);
    setDate(date);
  }, [timestamp]);

  if (!date) {
    return <HorizontalDatePickerSkeleton />;
  }

  return <DatePicker selectedDate={date} dictionary={dictionary} />;
}
