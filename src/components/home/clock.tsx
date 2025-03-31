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
