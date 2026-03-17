"use client";

import type { Task } from "@/features/manifest/types";
import { HomeTaskCard } from "./HomeTaskCard";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  getSubtitle: (task: Task) => { text: string; className?: string };
}

export function TaskSection({ title, tasks, getSubtitle }: TaskSectionProps) {
  if (tasks.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
          {title}
        </h2>
        <span className="font-mono text-xs text-zinc-600">{tasks.length}</span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => {
          const sub = getSubtitle(task);
          return (
            <HomeTaskCard
              key={task.id}
              task={task}
              subtitle={sub.text}
              subtitleClassName={sub.className}
            />
          );
        })}
      </div>
    </section>
  );
}
