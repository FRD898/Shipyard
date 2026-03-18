import type { Status, TaskType, Priority } from "../types";

export const COLUMN_COLORS: Record<Status, string> = {
  Backlog: "#6b7280",
  Queued: "#8b5cf6",
  "In Progress": "#3b82f6",
  Blocked: "#ef4444",
  "In Review": "#f59e0b",
  Done: "#10b981",
};

export const TYPE_COLORS: Record<TaskType, { bg: string; text: string }> = {
  PRD: { bg: "bg-violet-500/20", text: "text-violet-400" },
  TDD: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  Impl: { bg: "bg-blue-500/20", text: "text-blue-400" },
  Review: { bg: "bg-amber-500/20", text: "text-amber-400" },
  Bug: { bg: "bg-red-500/20", text: "text-red-400" },
  Docs: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  REL: { bg: "bg-pink-500/20", text: "text-pink-400" },
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  Low: "bg-zinc-500",
  Medium: "bg-yellow-400",
  High: "bg-red-500",
};
