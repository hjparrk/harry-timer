import { HydrationWrapper } from "@/components/common/hydration-wrapper";
import Timer from "@/components/timer/timer";

export default function TimerPage() {
  return (
    <HydrationWrapper>
      <Timer />
    </HydrationWrapper>
  );
}
