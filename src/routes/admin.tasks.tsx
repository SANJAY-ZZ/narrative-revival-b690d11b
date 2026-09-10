import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { FilterSelect, Pill, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { PRIORITY_COLORS, TASK_STATUSES, TASK_STATUS_COLORS } from "@/components/portal/status";
import { EMPLOYEES, TASKS, employeeById, formatDate, projectById } from "@/data/mock";
import type { Task, TaskStatus } from "@/data/types";

const TITLE = "Tasks — ORVNT Admin";
const DESC = "Delivery board of every task across ORVNT engagements (demo data).";

export const Route = createFileRoute("/admin/tasks")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminTasks,
});

function AdminTasks() {
  const [query, setQuery] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");
  const [statuses, setStatuses] = useState<Record<string, TaskStatus>>({});

  const statusOf = (t: Task) => statuses[t.id] ?? t.status;

  const filtered = useMemo(
    () =>
      TASKS.filter((t) => {
        const q = query.trim().toLowerCase();
        const owner = employeeById(t.assignee)?.name ?? "";
        const matchesQuery = !q || t.title.toLowerCase().includes(q) || owner.toLowerCase().includes(q);
        return matchesQuery && (!assignee || owner === assignee) && (!priority || t.priority === priority);
      }),
    [query, assignee, priority],
  );

  const move = (t: Task, next: TaskStatus) => {
    setStatuses((s) => ({ ...s, [t.id]: next }));
    toast.success(`"${t.title}" → ${next}`, { description: "Demo only — not persisted." });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Tasks"
        description="Every task in flight, grouped by delivery stage. Move a card to change its stage."
        actions={<DemoBadge />}
      />

      <SectionCard>
        <Toolbar>
          <SearchInput value={query} onChange={setQuery} placeholder="Search tasks or owners…" />
          <FilterSelect value={assignee} onChange={setAssignee} options={EMPLOYEES.map((e) => e.name)} label="Owner" />
          <FilterSelect value={priority} onChange={setPriority} options={["High", "Medium", "Low"]} label="Priority" />
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
            {filtered.length} tasks
          </span>
        </Toolbar>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {TASK_STATUSES.map((col) => {
            const items = filtered.filter((t) => statusOf(t) === col);
            return (
              <div key={col} className="border border-border">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <span className="text-[11px] uppercase tracking-[0.08em]" style={{ color: TASK_STATUS_COLORS[col] }}>
                    {col}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{items.length}</span>
                </div>
                <div className="space-y-px bg-border">
                  {items.length === 0 ? (
                    <p className="bg-card px-3 py-6 text-center text-[11px] text-muted-foreground">Empty</p>
                  ) : (
                    items.map((t) => {
                      const idx = TASK_STATUSES.indexOf(statusOf(t));
                      const prev = TASK_STATUSES[idx - 1];
                      const next = TASK_STATUSES[idx + 1];
                      return (
                        <article key={t.id} className="bg-card p-3">
                          <h4 className="text-[13px] leading-snug text-foreground">{t.title}</h4>
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            {projectById(t.projectId)?.name ?? t.projectId}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Pill label={t.priority} color={PRIORITY_COLORS[t.priority]} />
                            <span className="text-[11px] text-muted-foreground">{formatDate(t.due)}</span>
                          </div>
                          <p className="mt-2 text-[11px] text-muted-foreground">
                            {employeeById(t.assignee)?.name ?? "Unassigned"}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <button
                              type="button"
                              disabled={!prev}
                              onClick={() => prev && move(t, prev)}
                              className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
                            >
                              ←
                            </button>
                            <button
                              type="button"
                              disabled={!next}
                              onClick={() => next && move(t, next)}
                              className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
                            >
                              →
                            </button>
                          </div>
                        </article>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
