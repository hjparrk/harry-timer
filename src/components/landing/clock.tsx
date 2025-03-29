"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Clock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  // useEffect로 로컬스토리지에서 is24Hour 값을 가져옴
  useEffect(() => {
    const savedIs24Hour = localStorage.getItem("is24Hour");
    if (savedIs24Hour !== null) {
      setIs24Hour(JSON.parse(savedIs24Hour)); // 로컬스토리지에서 값을 가져와 상태 설정
    }
  }, []);

  // is24Hour 값이 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("is24Hour", JSON.stringify(is24Hour)); // 상태 변경 시 로컬스토리지에 저장
  }, [is24Hour]);

  useEffect(() => {
    const newDate = new Date();
    newDate.setHours(newDate.getHours() + 3);
    setTime(formatTime(newDate));
    setDate(formatDate(newDate));

    const interval = setInterval(() => {
      const newDate = new Date();
      newDate.setHours(newDate.getHours() + 3);
      setTime(formatTime(newDate));
      setDate(formatDate(newDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [is24Hour]);

  const formatDate = useCallback((date: Date) => {
    return format(date, "eeee - dd MMMM yyyy");
  }, []);

  const formatTime = useCallback(
    (date: Date) => {
      return format(date, is24Hour ? "HH:mm:ss" : "h:mm:ss a");
    },
    [is24Hour],
  );

  if (!time) return null;

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          checked={is24Hour}
          onCheckedChange={setIs24Hour}
        />
        <Label htmlFor="airplane-mode">24-hour Mode</Label>
      </div>

      {/* 시간과 날짜 표시 */}
      <div className="font-digital w-10/12 text-center">
        <div className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl">
          {time}
        </div>
        <div className="text-lg sm:text-3xl md:text-4xl lg:text-5xl">
          {date}
        </div>
      </div>
    </div>
  );
}
