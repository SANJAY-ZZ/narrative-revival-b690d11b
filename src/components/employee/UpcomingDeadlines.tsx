import { formatDate, PROJECTS, TASKS, projectById } from "@/data/mock";
import { CURRENT_EMPLOYEE } from "@/data/mock";

export function UpcomingDeadlines() {
  const myTasks = TASKS.filter((t) => t.assignee === CURRENT_EMPLOYEE.id && t.status !== "Done")
    .slice()
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 5);

  return (
    <div className="border border-border bg-card p-5">
      <div className="eyebrow mb-4">Upcoming Deadlines</div>
      <ul className="space-y-3">
        {myTasks.map((t) => {
          const project = projectById(t.projectId);
          return (
            <li key={t.id} className="flex items-center justify-between gap-3 text-sm">
              <div className="min-w-0">
                <div className="truncate text-foreground">{t.title}</div>
                <div className="truncate text-xs text-muted-foreground">{project?.name}</div>
              </div>
              <span className="shrink-0 text-xs text-[var(--gold)]">{formatDate(t.due)}</span>
            </li>
          );
        })}
        {myTasks.length === 0 ? <li className="text-sm text-muted-foreground">No upcoming deadlines.</li> : null}
      </ul>
    </div>
  );
}
