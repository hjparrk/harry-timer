import { millisecondsToTime } from "@/utils/time-utils";
import { useState, useEffect } from "react";

export function useStopwatch() {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<string[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        return prev + 10;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [isActive]);

  const startStopwatch = () => setIsActive(true);
  const stopStopwatch = () => setIsActive(false);
  const recordLapTime = () =>
    setLapTimes((prev) => [millisecondsToTime(time), ...prev]);
  const resetStopwatch = () => {
    setTime(0);
    setLapTimes([]);
    setIsActive(false);
  };

  return {
    time,
    isActive,
    lapTimes,
    startStopwatch,
    stopStopwatch,
    recordLapTime,
    resetStopwatch,
  };
}
