import { useState, useEffect } from "react";

interface useTimerProps {
  initialTime: number;
  stopAtZero?: boolean;
}

export function useTimer({ initialTime, stopAtZero = true }: useTimerProps) {
  const [time, setTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) setIsCompleted(true);
        if (prev === 1 && stopAtZero) setIsActive(false);

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, stopAtZero]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => {
    setTime(initialTime); // 항상 최신 initialTime을 사용
    setIsActive(false);
    setIsCompleted(false);
  };

  return { time, isActive, isCompleted, startTimer, stopTimer, resetTimer };
}
