import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    const item = localStorage.getItem(key);
    if (!item) return initialValue;

    return JSON.parse(item);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
