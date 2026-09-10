import type { ProjectStatus, TaskStatus } from "@/data/types";

/** Single source of truth for status colours across both portals. */
export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  Planning: "var(--color-border-strong)",
  "In Progress": "var(--gold)",
  "In Review": "oklch(0.7 0.1 240)",
  Completed: "oklch(0.6 0.09 160)",
  "On Hold": "oklch(0.577 0.245 27.325)",
};

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  "To Do": "var(--color-border-strong)",
  "In Progress": "var(--gold)",
  Blocked: "oklch(0.577 0.245 27.325)",
  Review: "oklch(0.7 0.1 240)",
  Done: "oklch(0.6 0.09 160)",
};

export const PRIORITY_COLORS: Record<"Low" | "Medium" | "High", string> = {
  Low: "var(--color-border-strong)",
  Medium: "var(--gold)",
  High: "oklch(0.577 0.245 27.325)",
};

export const PROJECT_STATUSES: ProjectStatus[] = [
  "Planning",
  "In Progress",
  "In Review",
  "Completed",
  "On Hold",
];

export const TASK_STATUSES: TaskStatus[] = ["To Do", "In Progress", "Blocked", "Review", "Done"];
