"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Task, TaskType, Priority, Status } from "../types";

type TaskAction =
  | {
      type: "create";
      payload: {
        title: string;
        description: string;
        taskType: TaskType;
        priority: Priority;
        status: Status;
        dueDate: string | null;
      };
    }
  | { type: "update"; payload: Partial<Task> & { id: string } }
  | { type: "delete"; payload: { id: string } }
  | { type: "moveStatus"; payload: { id: string; to: Status } };

function reduce(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "create": {
      const { title, description, taskType, priority, status, dueDate } =
        action.payload;
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        type: taskType,
        priority,
        status,
        dueDate,
        createdAt: new Date().toISOString(),
        statusHistory: [],
      };
      return [...tasks, newTask];
    }
    case "update": {
      const { id, ...updates } = action.payload;
      return tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    }
    case "delete":
      return tasks.filter((t) => t.id !== action.payload.id);
    case "moveStatus": {
      const { id, to } = action.payload;
      return tasks.map((t) => {
        if (t.id !== id || t.status === to) return t;
        return {
          ...t,
          status: to,
          statusHistory: [
            ...t.statusHistory,
            { from: t.status, to, timestamp: new Date().toISOString() },
          ],
        };
      });
    }
    default:
      return tasks;
  }
}

export function useTaskReducer() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("manifest-tasks", []);

  const dispatch = useCallback(
    (action: TaskAction) => {
      setTasks((prev) => reduce(prev, action));
    },
    [setTasks],
  );

  return { tasks, dispatch };
}
