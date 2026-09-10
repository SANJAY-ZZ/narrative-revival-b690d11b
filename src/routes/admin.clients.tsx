import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { Modal } from "@/components/portal/Modal";
import { DataTable, FilterSelect, Pill, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { CLIENTS, PROJECTS, domainName, formatCurrency, formatDate } from "@/data/mock";
import type { Client } from "@/data/types";

const TITLE = "Clients — ORVNT Admin";
const DESC = "Client accounts, contacts and engagement counts across ORVNT (demo data).";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminClients,
});

const STATUS_COLORS: Record<Client["status"], string> = {
  Active: "oklch(0.6 0.09 160)",
  Prospect: "var(--gold)",
  Archived: "var(--color-border-strong)",
};

function AdminClients() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);

  const rows = useMemo(
    () =>
      CLIENTS.filter((c) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.contact.toLowerCase().includes(q);
        return matchesQuery && (!status || c.status === status);
      }),
    [query, status],
  );

  const clientProjects = selected ? PROJECTS.filter((p) => p.client === selected.name) : [];

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Clients"
        description="Accounts ORVNT delivers for, with primary contacts and live engagement counts."
        actions={<DemoBadge />}
      />

      <SectionCard padded={false}>
        <div className="p-5 pb-0">
          <Toolbar>
            <SearchInput value={query} onChange={setQuery} placeholder="Search clients, industries, contacts…" />
            <FilterSelect
              value={status}
              onChange={setStatus}
              options={["Active", "Prospect", "Archived"]}
              label="Status"
            />
            <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
              {rows.length} accounts
            </span>
          </Toolbar>
        </div>
        <DataTable<Client>
          rows={rows}
          rowKey={(c) => c.id}
          onRowClick={setSelected}
          empty="No clients match these filters."
          columns={[
            {
              key: "name",
              header: "Client",
              sortValue: (c) => c.name,
              render: (c) => <span className="text-foreground">{c.name}</span>,
            },
            { key: "industry", header: "Industry", sortValue: (c) => c.industry, render: (c) => c.industry },
            { key: "contact", header: "Contact", sortValue: (c) => c.contact, render: (c) => c.contact },
            { key: "since", header: "Client since", sortValue: (c) => c.since, render: (c) => formatDate(c.since) },
            {
              key: "projects",
              header: "Projects",
              sortValue: (c) => c.projects,
              render: (c) => <span className="text-foreground">{c.projects}</span>,
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

      <Modal
        open={selected !== null}
        onOpenChange={(v) => !v && setSelected(null)}
        title={selected?.name ?? ""}
        description={selected ? `${selected.industry} · client since ${formatDate(selected.since)}` : undefined}
      >
        {selected ? (
          <div className="space-y-5 text-sm">
            <div className="grid grid-cols-2 gap-4 text-[12px]">
              <div>
                <div className="eyebrow">Primary contact</div>
                <div className="mt-1 text-foreground">{selected.contact}</div>
              </div>
              <div className="min-w-0">
                <div className="eyebrow">Email</div>
                <div className="mt-1 truncate text-foreground">{selected.email}</div>
              </div>
            </div>
            <div>
              <div className="eyebrow mb-2">Engagements</div>
              {clientProjects.length === 0 ? (
                <p className="text-[12px] text-muted-foreground">No active engagements.</p>
              ) : (
                <ul className="divide-y divide-border border border-border">
                  {clientProjects.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3 px-3 py-2 text-[12px]">
                      <span className="min-w-0 truncate text-foreground">{p.name}</span>
                      <span className="shrink-0 text-muted-foreground">
                        {domainName(p.domain)} · {formatCurrency(p.budget)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
