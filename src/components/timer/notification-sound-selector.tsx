import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { soundFiles } from "@/data/sound-files";

export function NotificationSoundSelector({
  soundKey,
  setSoundKey,
}: {
  soundKey: string;
  setSoundKey: (newSoundKey: string) => void;
}) {
  const playSound = (soundKey: string) => {
    const sound = soundFiles[soundKey]?.path;
    if (sound) {
      const audio = new Audio(sound);
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
  );
}
