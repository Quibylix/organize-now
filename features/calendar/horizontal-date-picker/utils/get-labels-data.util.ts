export function getLabelsData(
  daysToShow: Date[],
  positionDisplacement: number,
  variant: "month",
  months: string[],
): { label: string; left: number }[];
export function getLabelsData(
  daysToShow: Date[],
  positionDisplacement: number,
  variant: "year",
  months?: never,
): { label: string; left: number }[];

export function getLabelsData(
  daysToShow: Date[],
  positionDisplacement: number,
  variant: "month" | "year",
  months?: string[],
) {
  const needsLabel = (date: Date, index: number) => {
    if (variant === "year") {
      return index === 0 || (date.getMonth() === 0 && date.getDate() === 1);
    }

    return index === 0 || date.getDate() === 1;
  };

  const getLabel = (date: Date) => {
    if (variant === "year") {
      return date.getFullYear().toString();
    }

    return months![date.getMonth()];
  };

  const labels = [] as { label: string; left: number }[];
  daysToShow.forEach((date, index) => {
    needsLabel(date, index) &&
      labels.push({
        label: getLabel(date),
        left: index * positionDisplacement,
      });
  });
  return labels;
}
