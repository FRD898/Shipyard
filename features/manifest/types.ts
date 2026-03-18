export type TaskType = "PRD" | "TDD" | "Impl" | "Review" | "Bug" | "Docs" | "REL";

export type Priority = "Low" | "Medium" | "High";

export type Status =
  | "Backlog"
  | "Queued"
  | "In Progress"
  | "Blocked"
  | "In Review"
  | "Done";

export const STATUSES: Status[] = [
  "Backlog",
  "Queued",
  "In Progress",
  "Blocked",
  "In Review",
  "Done",
];

export const TASK_TYPES: TaskType[] = [
  "PRD",
  "TDD",
  "Impl",
  "Review",
  "Bug",
  "Docs",
  "REL",
];

export const PRIORITIES: Priority[] = ["Low", "Medium", "High"];

export interface StatusHistoryEntry {
  from: Status;
  to: Status;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: Priority;
  status: Status;
  dueDate: string | null;
  createdAt: string;
  statusHistory: StatusHistoryEntry[];
}
