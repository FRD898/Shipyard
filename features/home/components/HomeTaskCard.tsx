"use client";

import Link from "next/link";
import type { Task } from "@/features/manifest/types";
import { TYPE_COLORS, PRIORITY_COLORS } from "@/features/manifest/utils/theme";
import { Badge } from "@/components/ui/badge";

interface HomeTaskCardProps {
  task: Task;
  subtitle: string;
  subtitleClassName?: string;
}

export function HomeTaskCard({
  task,
  subtitle,
  subtitleClassName = "text-zinc-500",
}: HomeTaskCardProps) {
  const typeStyle = TYPE_COLORS[task.type];
  const priorityColor = PRIORITY_COLORS[task.priority];

  return (
    <Link
      href="/manifest"
      className="group block rounded-md border border-zinc-800 bg-zinc-900 p-3 transition-all hover:border-zinc-600 hover:bg-zinc-800/80"
    >
      <div className="mb-2 flex items-center gap-2">
        <Badge
          variant="secondary"
          className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${typeStyle.bg} ${typeStyle.text} border-0`}
        >
          {task.type}
        </Badge>
        <span className={`ml-auto h-2 w-2 rounded-full ${priorityColor}`} />
      </div>

      <p className="font-mono text-[13px] leading-tight text-zinc-200">
        {task.title}
      </p>

      <p className={`mt-2 font-mono text-[11px] ${subtitleClassName}`}>
        {subtitle}
      </p>
    </Link>
  );
}
