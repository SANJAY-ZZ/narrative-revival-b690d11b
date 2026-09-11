import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { Modal } from "@/components/portal/Modal";
import {
  DataTable,
  FilterSelect,
  Pill,
  ProgressBar,
  SearchInput,
  SectionCard,
  Toolbar,
} from "@/components/portal/table";
import { PROJECT_STATUS_COLORS, PROJECT_STATUSES } from "@/components/portal/status";
import { DOMAINS, PROJECTS, domainName, formatCurrency, formatDate } from "@/data/mock";
import type { Project, ProjectStatus } from "@/data/types";

const TITLE = "Projects — ORVNT Admin";
const DESC = "Portfolio of ORVNT engagements with status, progress and budget (demo data).";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProjects,
});

function AdminProjects() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [domain, setDomain] = useState("");
  const [overrides, setOverrides] = useState<Record<string, ProjectStatus>>({});
  const [selected, setSelected] = useState<Project | null>(null);

  const statusOf = (p: Project) => overrides[p.id] ?? p.status;

  const rows = useMemo(
    () =>
      PROJECTS.filter((p) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.technologies.join(" ").toLowerCase().includes(q);
        const matchesStatus = !status || statusOf(p) === status;
        const matchesDomain = !domain || domainName(p.domain) === domain;
        return matchesQuery && matchesStatus && matchesDomain;
      }),
    [query, status, domain, overrides],
  );

  const setStatusFor = (p: Project, next: ProjectStatus) => {
    setOverrides((o) => ({ ...o, [p.id]: next }));
    toast.success(`${p.name} moved to ${next}`, { description: "Demo only — not persisted." });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Projects"
        description="Every active and closed engagement across the five ORVNT domains."
        actions={<DemoBadge />}
      />

      <SectionCard padded={false}>
        <div className="p-5 pb-0">
          <Toolbar>
            <SearchInput value={query} onChange={setQuery} placeholder="Search projects, clients, tech…" />
            <FilterSelect value={status} onChange={setStatus} options={PROJECT_STATUSES} label="Status" />
            <FilterSelect
              value={domain}
              onChange={setDomain}
              options={DOMAINS.map((d) => d.name)}
              label="Domain"
            />
            <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
              {rows.length} of {PROJECTS.length}
            </span>
          </Toolbar>
        </div>
        <DataTable<Project>
          rows={rows}
          rowKey={(p) => p.id}
          onRowClick={setSelected}
          empty="No projects match these filters."
          columns={[
            {
              key: "name",
              header: "Project",
              sortValue: (p) => p.name,
              className: "text-foreground",
              render: (p) => (
                <div className="min-w-0">
                  <div className="truncate text-foreground">{p.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{p.client}</div>
                </div>
              ),
            },
            { key: "domain", header: "Domain", sortValue: (p) => p.domain, render: (p) => domainName(p.domain) },
            {
              key: "status",
              header: "Status",
              sortValue: (p) => statusOf(p),
              render: (p) => <Pill label={statusOf(p)} color={PROJECT_STATUS_COLORS[statusOf(p)]} />,
            },
            {
              key: "progress",
              header: "Progress",
              sortValue: (p) => p.progress,
              render: (p) => <ProgressBar value={p.progress} />,
            },
            {
              key: "budget",
              header: "Budget",
              sortValue: (p) => p.budget,
              render: (p) => (
                <span className="whitespace-nowrap">
                  {formatCurrency(p.spent)} <span className="text-muted-foreground/60">/ {formatCurrency(p.budget)}</span>
                </span>
              ),
            },
            { key: "due", header: "Due", sortValue: (p) => p.dueDate, render: (p) => formatDate(p.dueDate) },
          ]}
        />
      </SectionCard>

      <Modal
        open={selected !== null}
        onOpenChange={(v) => { if (!v) setSelected(null); }}
        title={selected?.name ?? ""}
        description={selected ? `${domainName(selected.domain)} · ${selected.client}` : undefined}
      >
        {selected ? (
          <div className="space-y-5 text-sm">
            <p className="text-muted-foreground">{selected.overview}</p>

            <div className="grid grid-cols-2 gap-4 text-[12px]">
              <Field label="Phase" value={selected.phase} />
              <Field label="Progress" value={`${selected.progress}%`} />
              <Field label="Budget" value={formatCurrency(selected.budget)} />
              <Field label="Spent" value={formatCurrency(selected.spent)} />
              <Field label="Start" value={formatDate(selected.startDate)} />
              <Field label="Due" value={formatDate(selected.dueDate)} />
            </div>

            <div>
              <div className="eyebrow mb-2">Status</div>
              <div className="flex flex-wrap gap-2">
                {PROJECT_STATUSES.map((s) => {
                  const active = statusOf(selected) === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatusFor(selected, s)}
                      className={`border px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-colors ${
                        active
                          ? "border-gold text-gold"
                          : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="eyebrow mb-2">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {selected.technologies.map((t) => (
                  <span key={t} className="border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to="/projects/$projectId"
              params={{ projectId: selected.id }}
              className="inline-block border border-border px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              View public page
            </Link>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow">{label}</div>
      <div className="mt-1 text-foreground">{value}</div>
    </div>
  );
}
