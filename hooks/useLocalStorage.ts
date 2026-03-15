"use client";

import { useState, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored) as T;
    } catch {
      // localStorage unavailable or corrupt
    }
    return initialValue;
  });

  // Persist on every update call, not via effect
  const update = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next =
          typeof updater === "function"
            ? (updater as (prev: T) => T)(prev)
            : updater;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // localStorage full or unavailable
        }
        return next;
      });
    },
    [key],
  );

  return [value, update] as const;
}
