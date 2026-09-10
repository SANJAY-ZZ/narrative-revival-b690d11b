import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { StatCard } from "@/components/portal/StatCard";
import { ChartCard, LineChart } from "@/components/portal/ChartCard";
import { DataTable, Pill, ProgressBar, SectionCard } from "@/components/portal/table";
import { PROJECT_STATUSES, PROJECT_STATUS_COLORS } from "@/components/portal/status";
import { BUDGET_LINES, CLIENTS, DOMAINS, EMPLOYEES, PROJECTS, TASKS, domainName, formatCurrency } from "@/data/mock";
import type { Domain } from "@/data/types";

const TITLE = "Reports — ORVNT Admin";
const DESC = "Delivery, financial and capacity analytics across the ORVNT portfolio (demo data).";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminReports,
});

const RANGES = ["Last 30 days", "Last quarter", "Year to date"] as const;

function AdminReports() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("Last quarter");

  const avgProgress = Math.round(PROJECTS.reduce((s, p) => s + p.progress, 0) / PROJECTS.length);
  const openTasks = TASKS.filter((t) => t.status !== "Done").length;
  const allocated = BUDGET_LINES.reduce((s, b) => s + b.allocated, 0);
  const spent = BUDGET_LINES.reduce((s, b) => s + b.spent, 0);

  const progressSeries = PROJECTS.map((p, i) => ({ label: `P${i + 1}`, value: p.progress }));
  const spendSeries = BUDGET_LINES.map((b) => ({
    label: domainName(b.domain).slice(0, 3),
    value: Math.round((b.spent / b.allocated) * 100),
  }));

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Reports"
        description="Portfolio analytics assembled from delivery, finance and capacity signals."
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

      <div className="mb-6 flex flex-wrap gap-2">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={`border px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-colors ${
              range === r ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Average progress" value={`${avgProgress}%`} change="+6%" period={range} />
        <StatCard label="Open tasks" value={String(openTasks)} period={range} />
        <StatCard label="Budget utilisation" value={`${Math.round((spent / allocated) * 100)}%`} period={range} />
        <StatCard label="Active clients" value={String(CLIENTS.filter((c) => c.status === "Active").length)} period={range} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title="Delivery progress" subtitle={`Per engagement · ${range}`}>
          <LineChart data={progressSeries} />
        </ChartCard>
        <ChartCard title="Budget utilisation by domain" subtitle={`Percent of allocation spent · ${range}`}>
          <LineChart data={spendSeries} />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <SectionCard title="Status distribution" subtitle="Engagements by delivery stage">
          <ul className="space-y-4">
            {PROJECT_STATUSES.map((s) => {
              const count = PROJECTS.filter((p) => p.status === s).length;
              const pct = Math.round((count / PROJECTS.length) * 100);
              return (
                <li key={s}>
                  <div className="flex items-center justify-between text-[12px]">
                    <Pill label={s} color={PROJECT_STATUS_COLORS[s]} />
                    <span className="text-muted-foreground">
                      {count} · {pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-secondary">
                    <div className="h-full" style={{ width: `${pct}%`, background: PROJECT_STATUS_COLORS[s] }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard title="Domain performance" subtitle="Engagements, capacity and spend" padded={false}>
          <DataTable<Domain>
            rows={DOMAINS}
            rowKey={(d) => d.slug}
            minWidth={520}
            columns={[
              {
                key: "name",
                header: "Domain",
                sortValue: (d) => d.name,
                render: (d) => <span className="text-foreground">{d.name}</span>,
              },
              {
                key: "projects",
                header: "Projects",
                sortValue: (d) => PROJECTS.filter((p) => p.domain === d.slug).length,
                render: (d) => PROJECTS.filter((p) => p.domain === d.slug).length,
              },
              {
                key: "people",
                header: "People",
                sortValue: (d) => EMPLOYEES.filter((e) => e.department === d.name).length,
                render: (d) => EMPLOYEES.filter((e) => e.department === d.name).length,
              },
              {
                key: "progress",
                header: "Avg progress",
                render: (d) => {
                  const list = PROJECTS.filter((p) => p.domain === d.slug);
                  const v = list.length ? Math.round(list.reduce((s, p) => s + p.progress, 0) / list.length) : 0;
                  return <ProgressBar value={v} />;
                },
              },
              {
                key: "spend",
                header: "Spend",
                render: (d) => {
                  const line = BUDGET_LINES.find((b) => b.domain === d.slug);
                  return line ? formatCurrency(line.spent) : "—";
                },
              },
            ]}
          />
        </SectionCard>
      </div>
    </div>
  );
}
