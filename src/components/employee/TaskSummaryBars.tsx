import type { Task, TaskStatus } from "@/data/types";

const ORDER: TaskStatus[] = ["To Do", "In Progress", "Blocked", "Review", "Done"];

export function TaskSummaryBars({ tasks }: { tasks: Task[] }) {
  const total = tasks.length || 1;
  const counts = ORDER.map((status) => ({
    status,
    count: tasks.filter((t) => t.status === status).length,
  }));

  return (
    <div className="border border-border bg-card p-5">
      <div className="eyebrow mb-4">Task Summary</div>
      <div className="space-y-3">
        {counts.map(({ status, count }) => (
          <div key={status}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-foreground">{status}</span>
              <span className="text-muted-foreground">{count}</span>
            </div>
            <div className="h-1.5 w-full bg-secondary">
              <div
                className="h-full bg-[var(--gold)] transition-all"
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
