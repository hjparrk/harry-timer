import { ComponentProps, useState } from "react";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { NotificationSoundSelector } from "./notification-sound-selector";
import { useTimerStore } from "@/stores/timer-store";
import { secondsToHHMMDD, timeToSeconds } from "@/utils/time-utils";

interface TimerFormProps extends ComponentProps<"form"> {
  closeTimerForm: () => void;
}

export function TimerForm({ className, closeTimerForm }: TimerFormProps) {
  const { timerOptions, setTimerOptions } = useTimerStore();
  const { initialTime, initialSoundKey } = timerOptions;
  const {
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  } = secondsToHHMMDD(initialTime);

  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [soundKey, setSoundKey] = useState(initialSoundKey);

  const handleFormSubmit = () => {
    setTimerOptions({
      initialTime: timeToSeconds(hours, minutes, seconds),
      initialSoundKey: soundKey,
    });
    closeTimerForm();
  };

  return (
    <div className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label>Hours</Label>
        <div className="flex gap-2">
          <Slider
            value={[hours]}
            onValueChange={(newValue) => setHours(newValue[0])}
            max={12}
            step={1}
          />
          <span className="w-12 text-center">{hours}</span>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Minutes</Label>
        <div className="flex gap-2">
          <Slider
            value={[minutes]}
            onValueChange={(newValue) => setMinutes(newValue[0])}
            max={59}
            step={1}
          />
          <span className="w-12 text-center">{minutes}</span>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Seconds</Label>
        <div className="flex gap-2">
          <Slider
            value={[seconds]}
            onValueChange={(newValue) => setSeconds(newValue[0])}
            max={59}
            step={1}
          />
          <span className="w-12 text-center">{seconds}</span>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Nofitication Sound</Label>
        <NotificationSoundSelector
          soundKey={soundKey}
          setSoundKey={setSoundKey}
        />
      </div>

      <Button onClick={handleFormSubmit}>Save changes</Button>
    </div>
  );
}
