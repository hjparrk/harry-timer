import { format } from "date-fns";

const MINUTE = 60;
const HOUR = 60 * 60;

export const formatTimerTime = (time: number) => {
  return time > 0 ? time : Math.abs(time);
};

export const timeToSeconds = (
  hours: number,
  minutes: number,
  seconds: number,
) => {
  return hours * HOUR + minutes * MINUTE + seconds;
};

export const secondsToTime = (totalSeconds: number) => {
  const { hours, minutes, seconds } = secondsToHHMMDD(totalSeconds);

  const date = new Date(0);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  if (hours == 0) {
    return format(date, "mm:ss");
  }

  return format(date, "HH:mm:ss");
};

export const secondsToHHMMDD = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

export const millisecondsToTime = (ms: number) => {
  const hours = Math.floor(ms / 3600000); // 1 hour = 3600000ms
  ms %= 3600000;

  const minutes = Math.floor(ms / 60000); // 1 minute = 60000ms
  ms %= 60000;

  const seconds = Math.floor(ms / 1000); // 1 second = 1000ms
  const milliseconds = ms % 1000;

  const paddedMilliseconds = String(milliseconds).padStart(3, "0").slice(0, 2);
  if (hours === 0 && minutes === 0) {
    return `${seconds}.${paddedMilliseconds}`;
  }

  const paddedSeconds = String(seconds).padStart(2, "0");
  if (minutes > 0 && hours === 0) {
    return `${minutes}:${paddedSeconds}.${paddedMilliseconds}`;
  }

  const paddedMinutes = String(minutes).padStart(2, "0");
  return `${hours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
};
