export function getDueDateLabel(dueDate: string): {
  text: string;
  overdue: boolean;
} {
  const now = new Date();
  const due = new Date(dueDate);
  // Compare dates only (strip time)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueStart = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const diffMs = dueStart.getTime() - todayStart.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `${Math.abs(diffDays)}d overdue`, overdue: true };
  }
  if (diffDays === 0) return { text: "due today", overdue: false };
  if (diffDays === 1) return { text: "due tomorrow", overdue: false };
  return { text: `due in ${diffDays}d`, overdue: false };
}
