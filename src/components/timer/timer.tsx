"use client";

import { useEffect } from "react";
import { useTimerStore } from "@/stores/timer-store";
import { useTimer } from "@/hooks/use-timer";
import { formatTimerTime, secondsToTime } from "@/utils/time-utils";
import { Ping } from "@/components/ui/ping";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Pause, Play, RotateCcw } from "lucide-react";
import { TimerEditForm } from "./timer-edit-form";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { TIMER_MODE_KEY } from "@/data/storage-keys";
import { soundFiles } from "@/data/sound-files";
import { cn } from "@/lib/utils";

export default function Timer() {
  const [stopAtZero, setStopAtZero] = useLocalStorage(TIMER_MODE_KEY, false);
  const { timerOptions } = useTimerStore();
  const { initialTime, initialSoundKey, initialVolume, initialColor } =
    timerOptions;
  const { time, isActive, isCompleted, startTimer, stopTimer, resetTimer } =
    useTimer({
      initialTime,
      stopAtZero,
    });

  useEffect(() => {
    if (isCompleted) {
      const audio = new Audio(soundFiles[initialSoundKey].path);
      audio.volume = initialVolume;
      audio.preload = "auto";
      audio.play();
    }
  }, [isCompleted, initialSoundKey]);

  useEffect(() => {
    document.title = `${secondsToTime(formatTimerTime(time))} - Harry's Timer`;
  }, [time]);

  return (
    <div className="relative flex h-full flex-col items-center justify-center rounded-md">
      <Progress
        className="absolute top-0 h-1"
        value={((initialTime - time) / initialTime) * 100}
      />
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <Switch
          id="timer-mode"
          disabled={isActive}
          checked={stopAtZero}
          onCheckedChange={setStopAtZero}
        />
        <Label htmlFor="timer-mode">Stop Timer at Zero</Label>
      </div>

      <div className="relative space-y-14">
        <div className="relative">
          <div
            className={cn(
              "inline-block min-w-32 !bg-clip-text !bg-center text-center font-sans text-5xl font-semibold tracking-tight transition-all sm:text-7xl md:text-[7rem] lg:text-[9rem]",
              initialColor !== "" && "text-transparent",
            )}
            style={{ background: initialColor }}
          >
            {secondsToTime(formatTimerTime(time))}
          </div>

          {isCompleted && (
            <div className="absolute -top-3 -right-3">
              <Ping />
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-2">
          {!isActive ? (
            <Button onClick={startTimer} className="flex-1 rounded-full">
              <Play />
            </Button>
          ) : (
            <Button onClick={stopTimer} className="flex-1 rounded-full">
              <Pause />
            </Button>
          )}
          <Button onClick={resetTimer} className="flex-1 rounded-full">
            <RotateCcw />
          </Button>

          <TimerEditForm isActive={isActive} />
        </div>
      </div>
    </div>
  );
}
