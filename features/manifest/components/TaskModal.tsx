"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task, TaskType, Priority, Status } from "../types";
import { TASK_TYPES, PRIORITIES } from "../types";
import { TYPE_COLORS, PRIORITY_COLORS } from "../utils/theme";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TaskModalProps {
  task: Task | null;
  defaultStatus?: Status;
  mode: "create" | "edit";
  open: boolean;
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
  open,
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
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="w-full max-w-lg rounded-xl border-zinc-700 bg-zinc-900 p-0 sm:max-w-lg"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="border-b border-zinc-800 px-5 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-mono text-sm font-semibold text-zinc-200">
              {mode === "create" ? "New Task" : "Edit Task"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300"
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
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-5">
          {/* Title */}
          <Input
            autoFocus
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="mb-4 border-zinc-700 bg-zinc-800 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:border-zinc-500 focus-visible:ring-0"
          />

          {/* Description */}
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="mb-4 resize-none border-zinc-700 bg-zinc-800 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:border-zinc-500 focus-visible:ring-0"
          />

          {/* Type selector */}
          <div className="mb-4">
            <Label className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Type
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {TASK_TYPES.map((t) => {
                const style = TYPE_COLORS[t];
                return (
                  <Button
                    key={t}
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => setTaskType(t)}
                    className={`font-mono text-[11px] font-semibold ${
                      taskType === t
                        ? `${style.bg} ${style.text} ring-1 ring-current`
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {t}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Priority selector */}
          <div className="mb-4">
            <Label className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Priority
            </Label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <Button
                  key={p}
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => setPriority(p)}
                  className={`flex items-center gap-1.5 font-mono text-[11px] ${
                    priority === p
                      ? "bg-zinc-700 text-zinc-200 ring-1 ring-zinc-500"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${PRIORITY_COLORS[p]}`}
                  />
                  {p}
                </Button>
              ))}
            </div>
          </div>

          {/* Due date */}
          <div className="mb-5">
            <Label className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Due Date
            </Label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-auto border-zinc-700 bg-zinc-800 font-mono text-sm text-zinc-200 focus-visible:border-zinc-500 focus-visible:ring-0 [color-scheme:dark]"
            />
          </div>

          {/* Status history (edit mode) */}
          {mode === "edit" &&
            task &&
            task.statusHistory.length > 0 && (
              <div className="mb-5">
                <Label className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  History
                </Label>
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
            <Button
              type="submit"
              disabled={!title.trim()}
              className="font-mono text-xs font-semibold"
            >
              {mode === "create" ? "Create" : "Save"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="font-mono text-xs text-zinc-400"
            >
              Cancel
            </Button>
            {mode === "edit" && onDelete && (
              <div className="ml-auto">
                {showDeleteConfirm ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-red-400">
                      Delete?
                    </span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="xs"
                      onClick={onDelete}
                      className="font-mono text-[11px]"
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="xs"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="font-mono text-[11px] text-zinc-500"
                    >
                      No
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="font-mono text-[11px] text-zinc-600 hover:text-red-400"
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
