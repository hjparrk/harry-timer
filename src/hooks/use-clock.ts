import { useEffect, useState } from "react";
import { formatDate, formatTime } from "@/utils/datetime-utils";
import { useLocalStorage } from "./use-localstorage";
import { CLOCK_MODE_KEY } from "@/data/storage-keys";

export function useClock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [is24Hour, setIs24Hour] = useLocalStorage<boolean>(
    CLOCK_MODE_KEY,
    false,
  );

  useEffect(() => {
    const updateTime = () => {
      const newDate = new Date();
      newDate.setHours(newDate.getHours());
      setTime(formatTime(newDate, is24Hour));
      setDate(formatDate(newDate));
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [is24Hour, formatDate, formatTime]);

  return { time, date, is24Hour, setIs24Hour };
}
