"use client";

import { ComponentProps, useEffect } from "react";

import { useTimer } from "@/hooks/use-timer";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useTimerStore } from "@/stores/timer-store";
import { soundFiles } from "@/data/sound-files";
import { TIMER_MODE_KEY } from "@/data/storage-keys";
import { formatTimerTime, secondsToTime } from "@/utils/time-utils";
import { cn } from "@/lib/utils";

import { Ping } from "@/components/ui/ping";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TimerEditForm } from "./timer-edit-form";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { Pause, Play, RotateCcw } from "lucide-react";

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
      <ThemeProgress
        className="absolute top-0 h-1"
        value={((initialTime - time) / initialTime) * 100}
        color={initialColor}
      />
      <ToggleTimerMode
        isActive={isActive}
        stopAtZero={stopAtZero}
        setStopAtZero={setStopAtZero}
        className="absolute top-5 left-5"
      />
      <TimerTime
        color={initialColor}
        time={time}
        isCompleted={isCompleted}
        isActive={isActive}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
    </div>
  );
}

function ThemeProgress({
  className,
  value,
  color,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Root> & { color: string }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          background: color,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

function ToggleTimerMode({
  isActive,
  stopAtZero,
  setStopAtZero,
  className,
}: {
  isActive: boolean;
  stopAtZero: boolean;
  setStopAtZero: (value: boolean) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Switch
        id="timer-mode"
        disabled={isActive}
        checked={stopAtZero}
        onCheckedChange={setStopAtZero}
      />
      <Label htmlFor="timer-mode">Stop Timer at Zero</Label>
    </div>
  );
}

function TimerTime({
  color,
  time,
  isCompleted,
  isActive,
  startTimer,
  stopTimer,
  resetTimer,
}: {
  color: string;
  time: number;
  isCompleted: boolean;
  isActive: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "inline-block min-w-32 !bg-clip-text !bg-center text-center font-sans text-5xl font-semibold tracking-tight transition-all sm:text-7xl md:text-[7rem] lg:text-[9rem]",
          color !== "" && "text-transparent",
        )}
        style={{ background: color }}
      >
        {secondsToTime(formatTimerTime(time))}
      </div>

      {isCompleted && (
        <div className="absolute -top-3 -right-3">
          <Ping />
        </div>
      )}

      <TimerButton
        isActive={isActive}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
        className="absolute top-30 right-0 left-0 flex justify-center space-x-2 sm:top-35 md:top-40 lg:top-50"
      />
    </div>
  );
}

function TimerButton({
  isActive,
  startTimer,
  stopTimer,
  resetTimer,
  className,
}: {
  isActive: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  className?: string;
}) {
  const PlayButton = (
    <Button onClick={startTimer} className="flex-1 rounded-full">
      <Play />
    </Button>
  );

  const PauseButton = (
    <Button onClick={stopTimer} className="flex-1 rounded-full">
      <Pause />
    </Button>
  );

  return (
    <div className={className}>
      {!isActive ? PlayButton : PauseButton}
      <Button onClick={resetTimer} className="flex-1 rounded-full">
        <RotateCcw />
      </Button>

      <TimerEditForm isActive={isActive} />
    </div>
  );
}
