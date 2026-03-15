"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false },
);

export function Kraken() {
  return (
    <div className="kraken-canvas">
      <Excalidraw theme="dark" />
    </div>
  );
}
