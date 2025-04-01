"use client";

import { useTimerStore } from "@/stores/timer-store";

export function HydrationWrapper({ children }: { children: React.ReactNode }) {
  const hasHydrated = useTimerStore((state) => state._hasHydrated);

  if (!hasHydrated) return;

  return <>{children}</>;
}
