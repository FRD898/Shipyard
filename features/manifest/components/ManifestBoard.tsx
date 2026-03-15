"use client";

import { useState, useCallback, useMemo } from "react";
import type { Task, TaskType, Priority, Status } from "../types";
import { STATUSES } from "../types";
import { useTaskReducer } from "../hooks/useTaskReducer";
import { Column } from "./Column";
import { TaskModal } from "./TaskModal";
import { FilterBar } from "./FilterBar";

export function ManifestBoard() {
  const { tasks, dispatch } = useTaskReducer();

  // Filters
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState<Set<TaskType>>(new Set());
  const [activePriorities, setActivePriorities] = useState<Set<Priority>>(
    new Set(),
  );

  // Modal state
  const [modalState, setModalState] = useState<
    | { mode: "create"; status: Status }
    | { mode: "edit"; task: Task }
    | null
  >(null);

  const toggleType = useCallback((type: TaskType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }, []);

  const togglePriority = useCallback((priority: Priority) => {
    setActivePriorities((prev) => {
      const next = new Set(prev);
      if (next.has(priority)) next.delete(priority);
      else next.add(priority);
      return next;
    });
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (activeTypes.size > 0 && !activeTypes.has(t.type)) return false;
      if (activePriorities.size > 0 && !activePriorities.has(t.priority))
        return false;
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [tasks, activeTypes, activePriorities, search]);

  const handleDrop = useCallback(
    (taskId: string, targetStatus: Status) => {
      dispatch({ type: "moveStatus", payload: { id: taskId, to: targetStatus } });
    },
    [dispatch],
  );

  const handleSave = useCallback(
    (data: {
      title: string;
      description: string;
      taskType: TaskType;
      priority: Priority;
      dueDate: string | null;
      status?: Status;
    }) => {
      if (modalState?.mode === "create") {
        dispatch({
          type: "create",
          payload: {
            title: data.title,
            description: data.description,
            taskType: data.taskType,
            priority: data.priority,
            status: data.status ?? modalState.status,
            dueDate: data.dueDate,
          },
        });
      } else if (modalState?.mode === "edit") {
        dispatch({
          type: "update",
          payload: {
            id: modalState.task.id,
            title: data.title,
            description: data.description,
            type: data.taskType,
            priority: data.priority,
            dueDate: data.dueDate,
          },
        });
      }
      setModalState(null);
    },
    [modalState, dispatch],
  );

  const handleDelete = useCallback(() => {
    if (modalState?.mode === "edit") {
      dispatch({ type: "delete", payload: { id: modalState.task.id } });
      setModalState(null);
    }
  }, [modalState, dispatch]);

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-zinc-800/60 px-5 py-3">
        <h1 className="font-mono text-sm font-bold tracking-wider text-zinc-300">
          MANIFEST
        </h1>
        <span className="font-mono text-[11px] text-zinc-600">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        activeTypes={activeTypes}
        onToggleType={toggleType}
        activePriorities={activePriorities}
        onTogglePriority={togglePriority}
      />

      {/* Board */}
      <div className="flex flex-1 gap-3 overflow-x-auto p-4">
        {STATUSES.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={filteredTasks.filter((t) => t.status === status)}
            onAddClick={() => setModalState({ mode: "create", status })}
            onTaskClick={(task) => setModalState({ mode: "edit", task })}
            onDrop={handleDrop}
          />
        ))}
      </div>

      {/* Modal */}
      {modalState && (
        <TaskModal
          mode={modalState.mode}
          task={modalState.mode === "edit" ? modalState.task : null}
          defaultStatus={
            modalState.mode === "create" ? modalState.status : undefined
          }
          onSave={handleSave}
          onDelete={modalState.mode === "edit" ? handleDelete : undefined}
          onClose={() => setModalState(null)}
        />
      )}
    </div>
  );
}
