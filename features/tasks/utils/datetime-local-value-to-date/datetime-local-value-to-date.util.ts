export function datetimeLocalValueToDate(value: string): Date {
  if (/^\d+-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) === false) {
    throw new Error("Invalid datetime-local value");
  }

  const [date, time] = value.split("T");
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
  );
}
