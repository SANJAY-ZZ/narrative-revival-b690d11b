import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { DataTable, Pill, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { CLIENTS, PROJECTS, formatDate } from "@/data/mock";
import type { Client } from "@/data/types";

const TITLE = "Clients — ORVNT Employee Portal";
const DESC = "Read-only view of the clients ORVNT delivers for (demo data).";

export const Route = createFileRoute("/employee/clients")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeClients,
});

const STATUS_COLORS: Record<Client["status"], string> = {
  Active: "oklch(0.6 0.09 160)",
  Prospect: "var(--gold)",
  Archived: "var(--color-border-strong)",
};

function EmployeeClients() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const rows = CLIENTS.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q),
  );

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Clients"
        description="Who we build for. Contact details are managed by the delivery leads."
        actions={<DemoBadge />}
      />

      <SectionCard padded={false}>
        <div className="p-5 pb-0">
          <Toolbar>
            <SearchInput value={query} onChange={setQuery} placeholder="Search clients…" />
            <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
              {rows.length} accounts
            </span>
          </Toolbar>
        </div>
        <DataTable<Client>
          rows={rows}
          rowKey={(c) => c.id}
          empty="No clients match."
          columns={[
            {
              key: "name",
              header: "Client",
              sortValue: (c) => c.name,
              render: (c) => <span className="text-foreground">{c.name}</span>,
            },
            { key: "industry", header: "Industry", sortValue: (c) => c.industry, render: (c) => c.industry },
            { key: "since", header: "Since", sortValue: (c) => c.since, render: (c) => formatDate(c.since) },
            {
              key: "engagements",
              header: "Engagements",
              sortValue: (c) => PROJECTS.filter((p) => p.client === c.name).length,
              render: (c) => PROJECTS.filter((p) => p.client === c.name).length,
            },
            {
              key: "status",
              header: "Status",
              sortValue: (c) => c.status,
              render: (c) => <Pill label={c.status} color={STATUS_COLORS[c.status]} />,
            },
          ]}
        />
      </SectionCard>
    </div>
  );
}
