import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { ChartCard, LineChart } from "@/components/portal/ChartCard";
import { StatCard } from "@/components/portal/StatCard";
import { Pill, ProgressBar, SectionCard } from "@/components/portal/table";
import { TASK_STATUSES, TASK_STATUS_COLORS } from "@/components/portal/status";
import { myProjects } from "@/components/employee/MyProjectsTable";
import { CURRENT_EMPLOYEE, TASKS, TIMESHEET, domainName } from "@/data/mock";

const TITLE = "Reports — ORVNT Employee Portal";
const DESC = "Your delivery throughput, logged hours and project contribution (demo data).";

export const Route = createFileRoute("/employee/reports")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeReports,
});

function EmployeeReports() {
  const mine = TASKS.filter((t) => t.assignee === CURRENT_EMPLOYEE.id);
  const done = mine.filter((t) => t.status === "Done").length;
  const hours = TIMESHEET.reduce((s, t) => s + t.hours, 0);
  const projects = myProjects();
  const avg = mine.length ? Math.round(mine.reduce((s, t) => s + t.progress, 0) / mine.length) : 0;

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Reports"
        description="A personal view of throughput, time and where your effort went."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <DemoBadge />
            <button
              type="button"
              onClick={() => toast.success("Report export queued", { description: "Demo only — no file is produced." })}
              className="border border-border px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Export
            </button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tasks assigned" value={String(mine.length)} period="Current cycle" />
        <StatCard label="Completed" value={String(done)} change="+2" period="vs last cycle" />
        <StatCard label="Hours logged" value={`${hours}h`} period="Current week" />
        <StatCard label="Average progress" value={`${avg}%`} period="Across your tasks" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title="Hours by day" subtitle="Current week">
          <LineChart data={TIMESHEET.map((t) => ({ label: t.day, value: t.hours }))} />
        </ChartCard>
        <ChartCard title="Task progress" subtitle="Per assigned task">
          <LineChart data={mine.map((t, i) => ({ label: `T${i + 1}`, value: t.progress }))} />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <SectionCard title="Task stages" subtitle="Where your work sits">
          <ul className="space-y-4">
            {TASK_STATUSES.map((s) => {
              const count = mine.filter((t) => t.status === s).length;
              const pct = mine.length ? Math.round((count / mine.length) * 100) : 0;
              return (
                <li key={s}>
                  <div className="flex items-center justify-between text-[12px]">
                    <Pill label={s} color={TASK_STATUS_COLORS[s]} />
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-secondary">
                    <div className="h-full" style={{ width: `${pct}%`, background: TASK_STATUS_COLORS[s] }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard title="Project contribution" subtitle="Progress on engagements you support">
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-[12px]">
                  <span className="text-foreground">{p.name}</span>
                  <span className="text-muted-foreground">{domainName(p.domain)}</span>
                </div>
                <div className="mt-2 text-[12px]">
                  <ProgressBar value={p.progress} width={180} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
