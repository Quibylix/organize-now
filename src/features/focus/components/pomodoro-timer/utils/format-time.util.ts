export function formatTime(milliseconds: number) {
  const seconds = Math.round(milliseconds / 1000);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesString = minutes.toString().padStart(2, "0");
  const secondsString = remainingSeconds.toString().padStart(2, "0");

  return `${minutesString}:${secondsString}`;
}
