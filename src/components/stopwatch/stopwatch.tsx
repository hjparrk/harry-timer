"use client";

import { useStopwatch } from "@/hooks/use-stopwatch";
import { Button } from "../ui/button";
import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { millisecondsToTime } from "@/utils/time-utils";

export default function Stopwatch() {
  const {
    time,
    lapTimes,
    isActive,
    startStopwatch,
    stopStopwatch,
    recordLapTime,
    resetStopwatch,
  } = useStopwatch();

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <div className="flex h-full w-full flex-col items-center justify-end rounded-xl">
        <div className="space-y-14">
          <h1 className="min-w-32 text-center font-sans text-5xl font-semibold tracking-tight transition-all sm:text-7xl md:text-[7rem] lg:text-[9rem]">
            {millisecondsToTime(time)}
          </h1>
          <div className="flex justify-center space-x-2">
            {!isActive ? (
              <Button
                onClick={startStopwatch}
                className="max-w-60 flex-1 rounded-full"
              >
                <Play />
              </Button>
            ) : (
              <Button
                onClick={stopStopwatch}
                className="max-w-60 flex-1 rounded-full"
              >
                <Pause />
              </Button>
            )}

            <Button
              onClick={recordLapTime}
              className="max-w-60 flex-1 rounded-full"
            >
              <Timer />
            </Button>
            <Button onClick={resetStopwatch} className="rounded-full">
              <RotateCcw />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex rounded-xl">
        <ScrollArea type="always" className="w-1 flex-1">
          <div className="grid h-52 grid-flow-col grid-rows-4 justify-start gap-1">
            {lapTimes.map((lap, i) => (
              <div
                key={`lap-${i}`}
                className="text-md flex w-40 items-center justify-end rounded-xl sm:w-44 sm:text-lg md:w-48 md:text-xl"
              >
                ({lapTimes.length - i}) {lap}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="w-full" />
        </ScrollArea>
      </div>
    </div>
  );
}
