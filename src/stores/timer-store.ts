import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const STORAGE_KEY = "timer-storage";
const INIT_TIMER_OPTIONS = {
  initialTime: 300,
  initialSoundKey: "mute",
  initialVolume: 0.5,
  initialColor: "",
};

interface TimerOptions {
  initialTime: number; // seconds
  initialSoundKey: string;
  initialVolume: number;
  initialColor: string;
}

type TimerOptionsStore = {
  timerOptions: TimerOptions;
  _hasHydrated: boolean;
  setTimerOptions: (newOptions: TimerOptions) => void;
};

export const useTimerStore = create<TimerOptionsStore>()(
  persist(
    (set) => ({
      timerOptions: INIT_TIMER_OPTIONS,
      _hasHydrated: false,
      setTimerOptions: (newOptions) =>
        set((state) => ({
          timerOptions: { ...state.timerOptions, ...newOptions },
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      },
    },
  ),
);
