import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { StatCard } from "@/components/portal/StatCard";
import { DataTable, ProgressBar, SectionCard } from "@/components/portal/table";
import { BUDGET_LINES, PROJECTS, domainName, formatCurrency } from "@/data/mock";
import type { BudgetLine, Project } from "@/data/types";

const TITLE = "Budget — ORVNT Admin";
const DESC = "Allocation, spend and remaining budget by domain and engagement (demo data).";

export const Route = createFileRoute("/admin/budget")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminBudget,
});

function AdminBudget() {
  const allocated = BUDGET_LINES.reduce((s, b) => s + b.allocated, 0);
  const spent = BUDGET_LINES.reduce((s, b) => s + b.spent, 0);
  const remaining = allocated - spent;
  const utilisation = Math.round((spent / allocated) * 100);

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Budget"
        description="Where committed capital sits across the five domains and the engagements inside them."
        actions={<DemoBadge />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Allocated" value={formatCurrency(allocated)} period="Financial year 2026" />
        <StatCard label="Spent" value={formatCurrency(spent)} change={`+${utilisation}%`} period="of allocation" />
        <StatCard label="Remaining" value={formatCurrency(remaining)} period="Uncommitted" />
        <StatCard label="Domains funded" value={String(BUDGET_LINES.length)} period="Software → Ventures" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <SectionCard title="Domain utilisation" subtitle="Spend against allocation by domain">
          <ul className="space-y-5">
            {BUDGET_LINES.map((b) => {
              const pct = Math.round((b.spent / b.allocated) * 100);
              return (
                <li key={b.domain}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-[12px]">
                    <span className="text-foreground">{domainName(b.domain)}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(b.spent)} / {formatCurrency(b.allocated)}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-secondary">
                    <div className="h-full" style={{ width: `${pct}%`, background: "var(--gold)" }} />
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{pct}% utilised</div>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard title="Domain ledger" subtitle="Remaining headroom" padded={false}>
          <DataTable<BudgetLine>
            rows={BUDGET_LINES}
            rowKey={(b) => b.domain}
            minWidth={480}
            columns={[
              {
                key: "domain",
                header: "Domain",
                sortValue: (b) => b.domain,
                render: (b) => <span className="text-foreground">{domainName(b.domain)}</span>,
              },
              { key: "alloc", header: "Allocated", sortValue: (b) => b.allocated, render: (b) => formatCurrency(b.allocated) },
              { key: "spent", header: "Spent", sortValue: (b) => b.spent, render: (b) => formatCurrency(b.spent) },
              {
                key: "left",
                header: "Remaining",
                sortValue: (b) => b.allocated - b.spent,
                render: (b) => <span className="text-foreground">{formatCurrency(b.allocated - b.spent)}</span>,
              },
            ]}
          />
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Engagement spend" subtitle="Budget burn per project" padded={false}>
          <DataTable<Project>
            rows={PROJECTS}
            rowKey={(p) => p.id}
            columns={[
              {
                key: "name",
                header: "Project",
                sortValue: (p) => p.name,
                render: (p) => <span className="text-foreground">{p.name}</span>,
              },
              { key: "domain", header: "Domain", sortValue: (p) => p.domain, render: (p) => domainName(p.domain) },
              { key: "budget", header: "Budget", sortValue: (p) => p.budget, render: (p) => formatCurrency(p.budget) },
              { key: "spent", header: "Spent", sortValue: (p) => p.spent, render: (p) => formatCurrency(p.spent) },
              {
                key: "burn",
                header: "Burn",
                sortValue: (p) => p.spent / p.budget,
                render: (p) => <ProgressBar value={Math.round((p.spent / p.budget) * 100)} />,
              },
            ]}
          />
        </SectionCard>
      </div>
    </div>
  );
}
