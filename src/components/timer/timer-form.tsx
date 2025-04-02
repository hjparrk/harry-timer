import { ComponentProps, Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { secondsToHHMMDD, timeToSeconds } from "@/utils/time-utils";
import { useTimerStore } from "@/stores/timer-store";
import { toast } from "sonner";
import { GradientPicker } from "../common/gradient-picker";
import { soundFiles } from "@/data/sound-files";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function TimerForm({
  className,
  closeTimerForm,
}: ComponentProps<"form"> & { closeTimerForm: () => void }) {
  const { timerOptions, setTimerOptions } = useTimerStore();
  const { initialTime, initialSoundKey, initialVolume, initialColor } =
    timerOptions;
  const {
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  } = secondsToHHMMDD(initialTime);

  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [soundKey, setSoundKey] = useState(initialSoundKey);
  const [volume, setVolume] = useState(initialVolume);
  const [color, setColor] = useState(initialColor);

  const onVolumeChange = (volume: string) => {
    setVolume(parseFloat(volume));
  };

  const handleFormSubmit = () => {
    if (hours < 0 || hours > 12) {
      toast.error("Hours should be between 0 and 12.", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    if (minutes < 0 || minutes > 59) {
      alert("Minutes should be between 0 and 59.");
      return;
    }

    if (seconds < 0 || seconds > 59) {
      alert("Seconds should be between 0 and 59.");
      return;
    }

    if (!soundKey) {
      alert("Please select a notification sound.");
      return;
    }

    setTimerOptions({
      initialTime: timeToSeconds(hours, minutes, seconds),
      initialSoundKey: soundKey,
      initialVolume: volume,
      initialColor: color,
    });
    closeTimerForm();
  };

  return (
    <div className={cn("grid items-start gap-4", className)}>
      <HoursSlider hours={hours} setHours={setHours} />
      <MinutesSlider minutes={minutes} setMinutes={setMinutes} />
      <SecondsSlider seconds={seconds} setSeconds={setSeconds} />
      <NotificationSoundSelector
        soundKey={soundKey}
        setSoundKey={setSoundKey}
      />
      <SoundVolumeRadioGroup volume={volume} onValueChange={onVolumeChange} />
      <ThemePicker color={color} setColor={setColor} />
      <Button onClick={handleFormSubmit}>Save changes</Button>
    </div>
  );
}

function HoursSlider({
  hours,
  setHours,
}: {
  hours: number;
  setHours: (hours: number) => void;
}) {
  return (
    <Fragment>
      <div className="grid gap-2">
        <Label className="font-bold">Hours (max. 12 hrs)</Label>
        <div className="flex gap-2">
          <Slider
            value={[hours]}
            onValueChange={(newValue) => setHours(newValue[0])}
            max={12}
            step={1}
          />
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            max={12}
            step={1}
            value={hours}
            onChange={(e) => {
              const value = e.target.value;
              setHours(value === "" ? 0 : parseInt(value));
            }}
            className="w-16 rounded-full border-0 bg-transparent text-center shadow-none hover:ring-1 focus-visible:border-1 focus-visible:ring-0 dark:bg-transparent"
          />
        </div>
      </div>
    </Fragment>
  );
}

function MinutesSlider({
  minutes,
  setMinutes,
}: {
  minutes: number;
  setMinutes: (minutes: number) => void;
}) {
  return (
    <Fragment>
      <div className="grid gap-2">
        <Label className="font-bold">Minutes</Label>
        <div className="flex gap-2">
          <Slider
            value={[minutes]}
            onValueChange={(newValue) => setMinutes(newValue[0])}
            max={59}
            step={1}
          />
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            max={59}
            step={1}
            value={minutes}
            onChange={(e) => {
              const value = e.target.value;
              setMinutes(value === "" ? 0 : parseInt(value));
            }}
            className="w-16 rounded-full border-0 bg-transparent text-center shadow-none hover:ring-1 focus-visible:border-1 focus-visible:ring-0 dark:bg-transparent"
          />
        </div>
      </div>
    </Fragment>
  );
}

function SecondsSlider({
  seconds,
  setSeconds,
}: {
  seconds: number;
  setSeconds: (seconds: number) => void;
}) {
  return (
    <Fragment>
      <Label className="font-bold">Seconds</Label>
      <div className="flex gap-2">
        <Slider
          value={[seconds]}
          onValueChange={(newValue) => setSeconds(newValue[0])}
          max={59}
          step={1}
        />
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          max={59}
          step={1}
          value={seconds}
          onChange={(e) => {
            const value = e.target.value;
            setSeconds(value === "" ? 0 : parseInt(value));
          }}
          className="w-16 rounded-full border-0 bg-transparent text-center shadow-none hover:ring-1 focus-visible:border-1 focus-visible:ring-0 dark:bg-transparent"
        />
      </div>
    </Fragment>
  );
}

function NotificationSoundSelector({
  soundKey,
  setSoundKey,
}: {
  soundKey: string;
  setSoundKey: (soundKey: string) => void;
}) {
  const playSound = (soundKey: string) => {
    const sound = soundFiles[soundKey]?.path;
    if (sound) {
      const audio = new Audio(sound);
      audio.preload = "auto";
      audio.play();
    }
  };

  const handleSoundChange = (soundKey: string) => {
    setSoundKey(soundKey);
    if (soundKey !== "mute") {
      playSound(soundKey);
    }
  };

  return (
    <div className="grid gap-2">
      <Label className="font-bold">Notification Sound</Label>
      <Select value={soundKey} onValueChange={handleSoundChange}>
        <SelectTrigger className="w-full max-w-3xs">
          <SelectValue placeholder="Select Sound" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(soundFiles).map(([key, { name }]) => (
            <SelectItem key={key} value={key}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ThemePicker({
  color,
  setColor,
}: {
  color: string;
  setColor: (color: string) => void;
}) {
  return (
    <Fragment>
      <Label className="font-bold">Theme</Label>
      <GradientPicker background={color} setBackground={setColor} />
    </Fragment>
  );
}

function SoundVolumeRadioGroup({
  volume,
  onValueChange,
}: {
  volume: number;
  onValueChange: (volume: string) => void;
}) {
  return (
    <Fragment>
      <Label className="font-bold">Sound Volume</Label>
      <RadioGroup
        value={volume.toString()}
        onValueChange={onValueChange}
        className="grid-flow-col"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="0.1" id="0.1" />
          <Label htmlFor="0.1">0.1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="0.25" id="0.25" />
          <Label htmlFor="0.24">0.25</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="0.5" id="0.5" />
          <Label htmlFor="0.5">0.5</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="0.75" id="0.75" />
          <Label htmlFor="0.75">0.75</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id="1" />
          <Label htmlFor="1">1</Label>
        </div>
      </RadioGroup>
    </Fragment>
  );
}
