"use client";

import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { Task, Status } from "../types";
import { COLUMN_COLORS } from "../utils/theme";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  status: Status;
  tasks: Task[];
  onAddClick: () => void;
  onTaskClick: (task: Task) => void;
  onDrop: (taskId: string, targetStatus: Status) => void;
}

export function Column({
  status,
  tasks,
  onAddClick,
  onTaskClick,
  onDrop,
}: ColumnProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [over, setOver] = useState(false);
  const accentColor = COLUMN_COLORS[status];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return dropTargetForElements({
      element: el,
      canDrop: ({ source }) => source.data.type === "manifest-card",
      onDragEnter: () => setOver(true),
      onDragLeave: () => setOver(false),
      onDrop: ({ source }) => {
        setOver(false);
        const taskId = source.data.taskId as string;
        onDrop(taskId, status);
      },
    });
  }, [status, onDrop]);

  return (
    <div
      ref={ref}
      className={`col-span-2 flex flex-col rounded-lg border transition-colors ${over ? "border-zinc-500 bg-zinc-800/40" : "border-zinc-800/50 bg-zinc-900/30"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800/50 px-3 py-2.5">
        <span
          className="h-2.5 w-2.5 rounded-sm"
          style={{ backgroundColor: accentColor }}
        />
        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {status}
        </h3>
        <span className="ml-auto font-mono text-[11px] text-zinc-600">
          {tasks.length}
        </span>
        <button
          onClick={onAddClick}
          className="cursor-pointer rounded p-0.5 font-mono text-sm leading-none text-zinc-600 transition-colors hover:bg-zinc-700 hover:text-zinc-300"
        >
          +
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </div>
  );
}
