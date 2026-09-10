import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { StatCard } from "@/components/portal/StatCard";
import { ChartCard, LineChart, DonutChart } from "@/components/portal/ChartCard";
import { QuickAction } from "@/components/portal/QuickAction";
import { DemoBadge } from "@/components/portal/DemoBadge";
import {
  PROJECTS,
  CLIENTS,
  EMPLOYEES,
  BUDGET_LINES,
  formatCurrency,
  formatDate,
} from "@/data/mock";
import type { ProjectStatus } from "@/data/types";

const TITLE = "Dashboard — ORVNT Admin";
const DESC = "Overview of projects, clients, budget and team activity across ORVNT (demo data).";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

const STATUS_COLORS: Record<ProjectStatus, string> = {
  Planning: "var(--color-border-strong)",
  "In Progress": "var(--gold)",
  "In Review": "oklch(0.7 0.1 240)",
  Completed: "oklch(0.6 0.09 160)",
  "On Hold": "oklch(0.577 0.245 27.325)",
};

function AdminDashboard() {
  const navigate = useNavigate();

  const totalProjects = PROJECTS.length;
  const completed = PROJECTS.filter((p) => p.status === "Completed").length;
  const happyClients = CLIENTS.filter((c) => c.status === "Active").length;
  const teamMembers = EMPLOYEES.length;

  const totalAllocated = BUDGET_LINES.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = BUDGET_LINES.reduce((s, b) => s + b.spent, 0);
  const remaining = totalAllocated - totalSpent;
  const spentPct = Math.round((totalSpent / totalAllocated) * 100);

  const lineData = PROJECTS.slice(0, 8).map((p, i) => ({ label: `W${i + 1}`, value: p.progress }));

  const statusCounts = (
    ["Planning", "In Progress", "In Review", "Completed", "On Hold"] as ProjectStatus[]
  ).map((s) => ({
    label: s,
    value: PROJECTS.filter((p) => p.status === s).length,
    color: STATUS_COLORS[s],
  })).filter((d) => d.value > 0);

  const recentProjects = [...PROJECTS]
    .sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1))
    .slice(0, 6);

  const doAction = (label: string) => toast.success(label);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl text-foreground sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back, Admin.</p>
        </div>
        <DemoBadge />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Projects" value={String(totalProjects)} change="+12%" period="vs last quarter" />
        <StatCard label="Happy Clients" value={String(happyClients)} change="+8%" period="vs last quarter" />
        <StatCard label="Projects Completed" value={String(completed)} change="+4%" period="vs last quarter" />
        <StatCard label="Team Members" value={String(teamMembers)} change="+2%" period="vs last quarter" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <ChartCard title="Projects Overview" subtitle="Progress across active engagements">
            <LineChart data={lineData} />
          </ChartCard>

          <ChartCard title="Project Status" subtitle="Distribution across the current portfolio">
            <DonutChart data={statusCounts} />
          </ChartCard>

          <ChartCard title="Budget Summary" subtitle="Allocated vs. spent across all domains">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <div className="eyebrow">Allocated</div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-xl text-foreground">
                  {formatCurrency(totalAllocated)}
                </div>
              </div>
              <div>
                <div className="eyebrow">Spent</div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-xl text-foreground">
                  {formatCurrency(totalSpent)}
                </div>
              </div>
              <div>
                <div className="eyebrow">Remaining</div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-xl text-foreground">
                  {formatCurrency(remaining)}
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 w-full bg-secondary">
              <div className="h-full" style={{ width: `${spentPct}%`, background: "var(--gold)" }} />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">{spentPct}% of total budget spent</p>
          </ChartCard>

          <div className="border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-base text-foreground">
                Recent Projects
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[12px]">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="px-5 py-3 font-normal uppercase tracking-[0.08em]">Project</th>
                    <th className="px-5 py-3 font-normal uppercase tracking-[0.08em]">Client</th>
                    <th className="px-5 py-3 font-normal uppercase tracking-[0.08em]">Status</th>
                    <th className="px-5 py-3 font-normal uppercase tracking-[0.08em]">Budget</th>
                    <th className="px-5 py-3 font-normal uppercase tracking-[0.08em]">Progress</th>
                    <th className="px-5 py-3 font-normal uppercase tracking-[0.08em]">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                      <td className="px-5 py-3 text-foreground">{p.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{p.client}</td>
                      <td className="px-5 py-3">
                        <span
                          className="border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]"
                          style={{ borderColor: STATUS_COLORS[p.status], color: STATUS_COLORS[p.status] }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{formatCurrency(p.budget)}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-secondary">
                            <div className="h-full" style={{ width: `${p.progress}%`, background: "var(--gold)" }} />
                          </div>
                          <span className="text-muted-foreground">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{formatDate(p.dueDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-base text-foreground">Employees</h3>
            </div>
            <ul>
              {EMPLOYEES.slice(0, 6).map((e) => (
                <li key={e.id} className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-0">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-[11px] font-medium text-ink"
                    style={{ background: "var(--gold)" }}
                  >
                    {e.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] text-foreground">{e.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{e.email}</p>
                    <p className="truncate text-[10px] uppercase tracking-[0.06em] text-muted-foreground">{e.role}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/admin/employees"
              className="block border-t border-border px-5 py-3 text-center text-[11px] uppercase tracking-[0.14em] text-gold hover:opacity-80"
            >
              View all employees
            </Link>
          </div>

          <div className="border border-border bg-card p-5">
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-base text-foreground">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <QuickAction label="Edit Website Content" onClick={() => navigate({ to: "/admin/content" })} />
              <QuickAction
                label="Add New Project"
                onClick={() => {
                  doAction("Redirecting to Projects");
                  navigate({ to: "/admin/projects" });
                }}
              />
              <QuickAction
                label="Add New Client"
                onClick={() => {
                  doAction("Redirecting to Clients");
                  navigate({ to: "/admin/clients" });
                }}
              />
              <QuickAction
                label="Add Employee"
                onClick={() => {
                  doAction("Redirecting to Employees");
                  navigate({ to: "/admin/employees" });
                }}
              />
              <QuickAction
                label="Allocate Budget"
                onClick={() => {
                  doAction("Redirecting to Budget");
                  navigate({ to: "/admin/budget" });
                }}
              />
              <QuickAction label="View Reports" onClick={() => navigate({ to: "/admin/reports" })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
