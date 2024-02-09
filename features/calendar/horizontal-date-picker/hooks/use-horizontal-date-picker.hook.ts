import { useEffect, useRef, useState } from "react";
import { GAP, MIN_DAY_WIDTH } from "../constants/picker-sizes.constant";
import { getLabelsData } from "../utils/get-labels-data.util";

export function useHorizontalDatePicker(selectedDate: Date, months: string[]) {
  const [daysToShow, setDaysToShow] = useState<Date[]>([]);
  const [centralDate, setCentralDate] = useState(selectedDate);
  const [monthLabels, setMonthLabels] = useState<
    { label: string; left: number }[]
  >([]);
  const [yearLabels, setYearLabels] = useState<
    { label: string; left: number }[]
  >([]);

  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setCentralDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    function updateDaysToShow() {
      const containerWidth = containerRef.current?.clientWidth ?? 0;

      const daysLength = Math.floor(
        (containerWidth + GAP) / (MIN_DAY_WIDTH + GAP),
      );
      const centerIndex = Math.floor(daysLength / 2);

      const newDaysToShow = Array.from({ length: daysLength }).map(
        (_, index) => {
          const date = new Date(centralDate);
          date.setDate(centralDate.getDate() + index - centerIndex);

          return date;
        },
      );

      const positionDisplacement = (containerWidth + GAP) / daysLength;

      const newMonthLabels = getLabelsData(
        newDaysToShow,
        positionDisplacement,
        "month",
        months,
      );
      const newYearLabels = getLabelsData(
        newDaysToShow,
        positionDisplacement,
        "year",
      );

      setDaysToShow(newDaysToShow);
      setMonthLabels(newMonthLabels);
      setYearLabels(newYearLabels);
    }

    updateDaysToShow();

    const resizeObserver = new ResizeObserver(updateDaysToShow);
    containerRef.current && resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [centralDate, months]);

  function slideRight() {
    const newCentralDate = new Date(centralDate);
    newCentralDate.setDate(centralDate.getDate() + daysToShow.length);
    setCentralDate(newCentralDate);
  }

  function slideLeft() {
    const newCentralDate = new Date(centralDate);
    newCentralDate.setDate(centralDate.getDate() - daysToShow.length);
    setCentralDate(newCentralDate);
  }

  return {
    containerRef,
    daysToShow,
    monthLabels,
    yearLabels,
    slideRight,
    slideLeft,
  };
}
