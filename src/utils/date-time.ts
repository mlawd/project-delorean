const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function formatDateTime(dt: Date | null) {
  if (dt) return `${days[dt.getDay() - 1]} ${dt.toLocaleTimeString()}`;
}

export function calcDiff(start: number, end: number | null) {
  if (!end) {
    return null;
  }

  const totalMins = Math.floor((end - start) / 1000 / 60);

  return {
    totalMins,
    mins: totalMins % 60,
    hours: Math.floor(totalMins / 60),
  };
}
