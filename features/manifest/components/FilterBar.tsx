"use client";

import type { TaskType, Priority } from "../types";
import { TASK_TYPES, PRIORITIES } from "../types";
import { TYPE_COLORS, PRIORITY_COLORS } from "../utils/theme";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeTypes: Set<TaskType>;
  onToggleType: (type: TaskType) => void;
  activePriorities: Set<Priority>;
  onTogglePriority: (priority: Priority) => void;
}

export function FilterBar({
  search,
  onSearchChange,
  activeTypes,
  onToggleType,
  activePriorities,
  onTogglePriority,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-zinc-800/60 bg-zinc-950/50 px-4 py-2.5">
      {/* Search */}
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="w-44 rounded-md border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 font-mono text-xs text-zinc-300 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />
      </div>

      <span className="h-4 w-px bg-zinc-800" />

      {/* Type filters */}
      <div className="flex items-center gap-1">
        {TASK_TYPES.map((t) => {
          const active = activeTypes.has(t);
          const style = TYPE_COLORS[t];
          return (
            <button
              key={t}
              onClick={() => onToggleType(t)}
              className={`cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition-all ${
                active
                  ? `${style.bg} ${style.text}`
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <span className="h-4 w-px bg-zinc-800" />

      {/* Priority filters */}
      <div className="flex items-center gap-1">
        {PRIORITIES.map((p) => {
          const active = activePriorities.has(p);
          return (
            <button
              key={p}
              onClick={() => onTogglePriority(p)}
              className={`cursor-pointer flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] transition-all ${
                active
                  ? "bg-zinc-700 text-zinc-200"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${PRIORITY_COLORS[p]}`}
              />
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
}
