import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { StatCard } from "@/components/portal/StatCard";
import { SectionCard } from "@/components/portal/table";
import { TimesheetChart } from "@/components/employee/TimesheetChart";
import { AttendancePanel } from "@/components/employee/AttendancePanel";
import { TIMESHEET, formatDate, projectById } from "@/data/mock";
import { myProjects } from "@/components/employee/MyProjectsTable";

const TITLE = "Timesheet — ORVNT Employee Portal";
const DESC = "Log hours against engagements and review the current week (demo data).";

export const Route = createFileRoute("/employee/timesheet")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeTimesheet,
});

function EmployeeTimesheet() {
  const projects = myProjects();
  const [rows, setRows] = useState(() => TIMESHEET.map((t) => ({ ...t })));

  const total = rows.reduce((s, r) => s + r.hours, 0);
  const billable = Math.round(total * 0.86 * 10) / 10;
  const target = 40;

  const setHours = (day: string, hours: number) =>
    setRows((rs) => rs.map((r) => (r.day === day ? { ...r, hours } : r)));

  const setProject = (day: string, projectId: string) =>
    setRows((rs) => rs.map((r) => (r.day === day ? { ...r, projectId } : r)));

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Timesheet"
        description="Hours logged this week, by day and engagement."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <DemoBadge />
            <button
              type="button"
              onClick={() =>
                toast.success(`Week submitted — ${total}h`, { description: "Demo only — not persisted." })
              }
              className="border border-gold px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-[var(--ink)]"
            >
              Submit week
            </button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Logged" value={`${total}h`} period="Current week" />
        <StatCard label="Billable" value={`${billable}h`} period="Estimated" />
        <StatCard label="Target" value={`${target}h`} period="Weekly" />
        <StatCard
          label="Variance"
          value={`${total - target >= 0 ? "+" : ""}${Math.round((total - target) * 10) / 10}h`}
          change={total >= target ? "+ on target" : undefined}
          period="Against target"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <SectionCard title="Week entries" subtitle="Adjust hours and the engagement each day was spent on">
            <ul className="space-y-3">
              {rows.map((r) => (
                <li
                  key={r.day}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border border-border p-3 sm:grid-cols-[60px_minmax(0,1fr)_120px]"
                >
                  <span className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground">{r.day}</span>
                  <select
                    aria-label={`Project for ${r.day}`}
                    value={r.projectId}
                    onChange={(e) => setProject(r.day, e.target.value)}
                    className="col-span-2 min-w-0 border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)] sm:col-span-1"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 justify-self-end">
                    <input
                      aria-label={`Hours for ${r.day}`}
                      type="number"
                      min={0}
                      max={16}
                      step={0.5}
                      value={r.hours}
                      onChange={(e) => setHours(r.day, Number(e.target.value))}
                      className="w-20 border border-border bg-background px-2 py-2 text-right text-sm text-foreground outline-none focus:border-[var(--gold)]"
                    />
                    <span className="text-[12px] text-muted-foreground">h</span>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <TimesheetChart entries={rows} />
        </div>

        <div className="space-y-6">
          <AttendancePanel full />
          <SectionCard title="By engagement" subtitle="Hours split this week">
            <ul className="space-y-3 text-[12px]">
              {projects.map((p) => {
                const h = rows.filter((r) => r.projectId === p.id).reduce((s, r) => s + r.hours, 0);
                const pct = total ? Math.round((h / total) * 100) : 0;
                return (
                  <li key={p.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="min-w-0 truncate text-foreground">{p.name}</span>
                      <span className="shrink-0 text-muted-foreground">{h}h</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full bg-secondary">
                      <div className="h-full" style={{ width: `${pct}%`, background: "var(--gold)" }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionCard>
          <SectionCard title="Last submitted" subtitle={formatDate("2026-08-28")}>
            <p className="text-[12px] text-muted-foreground">
              Approved by delivery lead. Entries for{" "}
              {projectById(rows[0]?.projectId ?? "")?.name ?? "your engagement"} carried over.
            </p>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
