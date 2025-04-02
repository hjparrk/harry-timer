"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useClock } from "@/hooks/use-clock";

export default function Clock() {
  const { time, date, is24Hour, setIs24Hour } = useClock();

  if (!time) return;

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <Switch
          id="clock-mode"
          checked={is24Hour}
          onCheckedChange={setIs24Hour}
        />
        <Label htmlFor="clock-mode">24-hour Mode</Label>
      </div>

      <div className="relative w-10/12 text-center font-sans font-semibold tracking-tight">
        <div className="text-5xl sm:text-7xl md:text-[7rem] lg:text-[9rem]">
          {time}
        </div>
        <div className="absolute top-30 right-0 left-0 text-lg sm:top-35 sm:text-3xl md:top-40 md:text-4xl lg:top-50 lg:text-5xl">
          {date}
        </div>
      </div>
    </div>
  );
}
