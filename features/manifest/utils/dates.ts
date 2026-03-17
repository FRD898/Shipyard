/** Parse a YYYY-MM-DD string as local midnight (not UTC). */
export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getDueDateLabel(dueDate: string): {
  text: string;
  overdue: boolean;
} {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueStart = parseLocalDate(dueDate);
  const diffMs = dueStart.getTime() - todayStart.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `${Math.abs(diffDays)}d overdue`, overdue: true };
  }
  if (diffDays === 0) return { text: "due today", overdue: false };
  if (diffDays === 1) return { text: "due tomorrow", overdue: false };
  return { text: `due in ${diffDays}d`, overdue: false };
}
