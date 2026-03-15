"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task, TaskType, Priority, Status } from "../types";
import { TASK_TYPES, PRIORITIES } from "../types";
import { TYPE_COLORS, PRIORITY_COLORS } from "../utils/theme";

interface TaskModalProps {
  task: Task | null;
  defaultStatus?: Status;
  mode: "create" | "edit";
  onSave: (data: {
    title: string;
    description: string;
    taskType: TaskType;
    priority: Priority;
    dueDate: string | null;
    status?: Status;
  }) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export function TaskModal({
  task,
  defaultStatus,
  mode,
  onSave,
  onDelete,
  onClose,
}: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [taskType, setTaskType] = useState<TaskType>(task?.type ?? "Impl");
  const [priority, setPriority] = useState<Priority>(task?.priority ?? "Medium");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setTaskType(task.type);
      setPriority(task.priority);
      setDueDate(task.dueDate ?? "");
    }
  }, [task]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) return;
      onSave({
        title: title.trim(),
        description,
        taskType,
        priority,
        dueDate: dueDate || null,
        status: defaultStatus,
      });
    },
    [title, description, taskType, priority, dueDate, defaultStatus, onSave],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <h2 className="font-mono text-sm font-semibold text-zinc-200">
            {mode === "create" ? "New Task" : "Edit Task"}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          {/* Title */}
          <input
            autoFocus
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="mb-4 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="mb-4 w-full resize-none rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
          />

          {/* Type selector */}
          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Type
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TASK_TYPES.map((t) => {
                const style = TYPE_COLORS[t];
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTaskType(t)}
                    className={`cursor-pointer rounded px-2 py-1 font-mono text-[11px] font-semibold transition-all ${
                      taskType === t
                        ? `${style.bg} ${style.text} ring-1 ring-current`
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority selector */}
          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Priority
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`cursor-pointer flex items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[11px] transition-all ${
                    priority === p
                      ? "bg-zinc-700 text-zinc-200 ring-1 ring-zinc-500"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${PRIORITY_COLORS[p]}`}
                  />
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Due date */}
          <div className="mb-5">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-mono text-sm text-zinc-200 outline-none focus:border-zinc-500 [color-scheme:dark]"
            />
          </div>

          {/* Status history (edit mode) */}
          {mode === "edit" &&
            task &&
            task.statusHistory.length > 0 && (
              <div className="mb-5">
                <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  History
                </label>
                <div className="max-h-32 space-y-1 overflow-y-auto rounded-md border border-zinc-800 bg-zinc-950 p-2">
                  {task.statusHistory.map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 font-mono text-[11px]"
                    >
                      <span className="text-zinc-600">
                        {new Date(entry.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-zinc-500">{entry.from}</span>
                      <span className="text-zinc-700">&rarr;</span>
                      <span className="text-zinc-300">{entry.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={!title.trim()}
              className="cursor-pointer rounded-md bg-zinc-200 px-4 py-2 font-mono text-xs font-semibold text-zinc-900 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {mode === "create" ? "Create" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-md px-4 py-2 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-200"
            >
              Cancel
            </button>
            {mode === "edit" && onDelete && (
              <div className="ml-auto">
                {showDeleteConfirm ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-red-400">
                      Delete?
                    </span>
                    <button
                      type="button"
                      onClick={onDelete}
                      className="cursor-pointer rounded bg-red-500/20 px-2 py-1 font-mono text-[11px] text-red-400 hover:bg-red-500/30"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="cursor-pointer font-mono text-[11px] text-zinc-500 hover:text-zinc-300"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="cursor-pointer font-mono text-[11px] text-zinc-600 transition-colors hover:text-red-400"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
