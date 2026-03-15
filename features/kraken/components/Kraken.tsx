"use client";

import { useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

const ExcalidrawComponent = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false },
);

const STORAGE_KEY = "kraken-scene";
const DEBOUNCE_MS = 300;

function loadScene() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const scene = JSON.parse(stored);
      return {
        elements: scene.elements ?? [],
        appState: scene.appState ?? {},
        files: scene.files ?? {},
      };
    }
  } catch {
    // corrupt or unavailable
  }
  return undefined;
}

export function Kraken() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Excalidraw doesn't export its onChange type publicly
  const handleChange = useCallback(
    (elements: readonly any[], appState: any, files: any) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        try {
          const data = {
            elements,
            appState: {
              viewBackgroundColor: appState.viewBackgroundColor,
            },
            files,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {
          // localStorage full or unavailable
        }
      }, DEBOUNCE_MS);
    },
    [],
  );

  return (
    <div className="kraken-canvas">
      <ExcalidrawComponent
        theme="dark"
        initialData={loadScene()}
        onChange={handleChange}
      />
    </div>
  );
}
