"use client";

import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { Task } from "../types";
import { TYPE_COLORS, PRIORITY_COLORS } from "../utils/theme";
import { getDueDateLabel } from "../utils/dates";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return draggable({
      element: el,
      getInitialData: () => ({ taskId: task.id, type: "manifest-card" }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [task.id]);

  const typeStyle = TYPE_COLORS[task.type];
  const priorityColor = PRIORITY_COLORS[task.priority];
  const dueInfo = task.dueDate ? getDueDateLabel(task.dueDate) : null;

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`group cursor-grab rounded-md border border-zinc-800 bg-zinc-900 p-3 transition-all hover:border-zinc-600 hover:bg-zinc-800/80 active:cursor-grabbing ${dragging ? "opacity-40 scale-95" : ""}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${typeStyle.bg} ${typeStyle.text}`}
        >
          {task.type}
        </span>
        <span className={`ml-auto h-2 w-2 rounded-full ${priorityColor}`} />
      </div>

      <p className="font-mono text-[13px] leading-tight text-zinc-200">
        {task.title}
      </p>

      {dueInfo && (
        <p
          className={`mt-2 font-mono text-[11px] ${dueInfo.overdue ? "text-red-400" : "text-zinc-500"}`}
        >
          {dueInfo.text}
        </p>
      )}
    </div>
  );
}
