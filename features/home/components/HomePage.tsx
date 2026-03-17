"use client";

import { useMemo } from "react";
import { useTaskReducer } from "@/features/manifest/hooks/useTaskReducer";
import { getDueDateLabel, parseLocalDate } from "@/features/manifest/utils/dates";
import type { Task, Priority } from "@/features/manifest/types";
import { TaskSection } from "./TaskSection";

const PRIORITY_ORDER: Record<Priority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

function getBlockedDays(task: Task): number {
  for (let i = task.statusHistory.length - 1; i >= 0; i--) {
    if (task.statusHistory[i].to === "Blocked") {
      const blockedAt = new Date(task.statusHistory[i].timestamp);
      const now = new Date();
      return Math.floor(
        (now.getTime() - blockedAt.getTime()) / (1000 * 60 * 60 * 24),
      );
    }
  }
  return 0;
}

function getOverdueDays(dueDate: string): number {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const dueStart = parseLocalDate(dueDate);
  return Math.round(
    (todayStart.getTime() - dueStart.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function HomePage() {
  const { tasks } = useTaskReducer();

  const dueTodayTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        if (!t.dueDate || t.status === "Done") return false;
        const overdue = getOverdueDays(t.dueDate);
        return overdue >= 0; // today (0) or past (positive)
      })
      .sort((a, b) => {
        const aOverdue = getOverdueDays(a.dueDate!);
        const bOverdue = getOverdueDays(b.dueDate!);
        // Overdue first (higher number = more overdue), then priority
        if (aOverdue > 0 && bOverdue === 0) return -1;
        if (aOverdue === 0 && bOverdue > 0) return 1;
        if (aOverdue !== bOverdue) return bOverdue - aOverdue;
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      });
  }, [tasks]);

  const blockedTasks = useMemo(() => {
    return tasks
      .filter((t) => t.status === "Blocked")
      .sort((a, b) => {
        const priDiff =
          PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        if (priDiff !== 0) return priDiff;
        return getBlockedDays(b) - getBlockedDays(a);
      });
  }, [tasks]);

  const isEmpty = dueTodayTasks.length === 0 && blockedTasks.length === 0;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 px-6 py-4">
        <h1 className="font-mono text-sm font-bold tracking-wider text-zinc-300">
          SHIPYARD
        </h1>
        <span className="font-mono text-xs text-zinc-500">{formatDate()}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 pb-24">
        {isEmpty ? (
          <div className="flex h-full min-h-[60vh] items-center justify-center">
            <p className="font-mono text-sm text-zinc-600">
              Nothing urgent. Smooth sailing.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <TaskSection
              title="Due Today"
              tasks={dueTodayTasks}
              getSubtitle={(task) => {
                const dueInfo = getDueDateLabel(task.dueDate!);
                return {
                  text: `${task.status} · ${dueInfo.text}`,
                  className: dueInfo.overdue
                    ? "text-red-400"
                    : "text-amber-400",
                };
              }}
            />

            <TaskSection
              title="Blocked"
              tasks={blockedTasks}
              getSubtitle={(task) => {
                const days = getBlockedDays(task);
                return {
                  text:
                    days === 0
                      ? "blocked today"
                      : `blocked ${days}d`,
                  className: "text-red-400",
                };
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
