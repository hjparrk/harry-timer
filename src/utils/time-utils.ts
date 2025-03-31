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

  return format(date, "HH:mm:ss");
};

export const secondsToHHMMDD = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};
