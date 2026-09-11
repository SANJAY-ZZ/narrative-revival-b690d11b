import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { DataTable, FilterSelect, Pill, ProgressBar, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { PRIORITY_COLORS, TASK_STATUSES, TASK_STATUS_COLORS } from "@/components/portal/status";
import { TaskDetail } from "@/components/employee/TaskDetail";
import { CURRENT_EMPLOYEE, TASKS, formatDate, projectById } from "@/data/mock";
import type { Task, TaskStatus } from "@/data/types";

const TITLE = "My Tasks — ORVNT Employee Portal";
const DESC = "Everything assigned to you, with stage, priority and due date (demo data).";

export const Route = createFileRoute("/employee/tasks")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeTasks,
});

function EmployeeTasks() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [overrides, setOverrides] = useState<Record<string, TaskStatus>>({});
  const [selected, setSelected] = useState<Task | null>(null);

  const mine = useMemo(() => TASKS.filter((t) => t.assignee === CURRENT_EMPLOYEE.id), []);
  const statusOf = (t: Task) => overrides[t.id] ?? t.status;

  const rows = useMemo(
    () =>
      mine.filter((t) => {
        const q = query.trim().toLowerCase();
        const matchesQuery = !q || t.title.toLowerCase().includes(q);
        return matchesQuery && (!status || statusOf(t) === status) && (!priority || t.priority === priority);
      }),
    [mine, query, status, priority, overrides],
  );

  const advance = (t: Task) => {
    const idx = TASK_STATUSES.indexOf(statusOf(t));
    const next = TASK_STATUSES[Math.min(idx + 1, TASK_STATUSES.length - 1)]!;
    setOverrides((o) => ({ ...o, [t.id]: next }));
    toast.success(`"${t.title}" → ${next}`, { description: "Demo only — not persisted." });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="My Tasks"
        description="Your workload across every engagement you are staffed on."
        actions={<DemoBadge />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {TASK_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(status === s ? "" : s)}
            className={`border p-4 text-left transition-colors ${
              status === s ? "border-gold" : "border-border hover:border-gold"
            } bg-card`}
          >
            <span className="eyebrow" style={{ color: TASK_STATUS_COLORS[s] }}>
              {s}
            </span>
            <span className="mt-2 block font-[family-name:var(--font-display)] text-2xl text-foreground">
              {mine.filter((t) => statusOf(t) === s).length}
            </span>
          </button>
        ))}
      </div>

      <SectionCard padded={false}>
        <div className="p-5 pb-0">
          <Toolbar>
            <SearchInput value={query} onChange={setQuery} placeholder="Search your tasks…" />
            <FilterSelect value={priority} onChange={setPriority} options={["High", "Medium", "Low"]} label="Priority" />
            <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
              {rows.length} tasks
            </span>
          </Toolbar>
        </div>
        <DataTable<Task>
          rows={rows}
          rowKey={(t) => t.id}
          onRowClick={setSelected}
          empty="Nothing assigned under these filters."
          columns={[
            {
              key: "title",
              header: "Task",
              sortValue: (t) => t.title,
              render: (t) => (
                <div className="min-w-0">
                  <div className="truncate text-foreground">{t.title}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {projectById(t.projectId)?.name ?? t.projectId}
                  </div>
                </div>
              ),
            },
            {
              key: "status",
              header: "Stage",
              sortValue: (t) => statusOf(t),
              render: (t) => <Pill label={statusOf(t)} color={TASK_STATUS_COLORS[statusOf(t)]} />,
            },
            {
              key: "priority",
              header: "Priority",
              sortValue: (t) => t.priority,
              render: (t) => <Pill label={t.priority} color={PRIORITY_COLORS[t.priority]} />,
            },
            { key: "progress", header: "Progress", sortValue: (t) => t.progress, render: (t) => <ProgressBar value={t.progress} /> },
            { key: "due", header: "Due", sortValue: (t) => t.due, render: (t) => formatDate(t.due) },
            {
              key: "action",
              header: "",
              render: (t) => (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    advance(t);
                  }}
                  disabled={statusOf(t) === "Done"}
                  className="whitespace-nowrap border border-border px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30"
                >
                  Advance
                </button>
              ),
            },
          ]}
        />
      </SectionCard>

      <TaskDetail task={selected} open={selected !== null} onOpenChange={(v) => { if (!v) setSelected(null); }} />
    </div>
  );
}
