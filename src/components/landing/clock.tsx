"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";

export default function Clock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const newDate = new Date();
    setTime(formatTime(newDate));
    setDate(formatDate(newDate));

    const interval = setInterval(() => {
      const newDate = new Date();
      setTime(formatTime(newDate));
      setDate(formatDate(newDate));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = useCallback((date: Date) => {
    return format(date, "eeee - dd MMMM yyyy");
  }, []);

  const formatTime = useCallback((date: Date) => {
    return format(date, "hh:mm:ss");
  }, []);

  if (!time) return;

  return (
    <div className="flex h-full items-center justify-center">
      <div className="font-digital w-10/12 space-y-5 text-center">
        <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
          {time}
        </div>
        <div className="text-lg sm:text-3xl md:text-4xl lg:text-5xl">
          {date}
        </div>
      </div>
    </div>
  );
}
