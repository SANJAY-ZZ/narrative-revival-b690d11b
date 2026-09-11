import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { Modal } from "@/components/portal/Modal";
import { FilterSelect, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { EMPLOYEES, PROJECTS, TASKS, formatDate } from "@/data/mock";
import type { Employee } from "@/data/types";

const TITLE = "Employees — ORVNT Admin";
const DESC = "The ORVNT team by department, role and location (demo data).";

export const Route = createFileRoute("/admin/employees")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminEmployees,
});

function AdminEmployees() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const [selected, setSelected] = useState<Employee | null>(null);

  const departments = useMemo(() => [...new Set(EMPLOYEES.map((e) => e.department))], []);

  const rows = useMemo(
    () =>
      EMPLOYEES.filter((e) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q || e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.location.toLowerCase().includes(q);
        return matchesQuery && (!dept || e.department === dept);
      }),
    [query, dept],
  );

  const openTasks = selected ? TASKS.filter((t) => t.assignee === selected.id && t.status !== "Done") : [];
  const projects = selected ? PROJECTS.filter((p) => p.team.includes(selected.id)) : [];

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Employees"
        description="Team directory with department, location and current workload."
        actions={<DemoBadge />}
      />

      <SectionCard>
        <Toolbar>
          <SearchInput value={query} onChange={setQuery} placeholder="Search people, roles, locations…" />
          <FilterSelect value={dept} onChange={setDept} options={departments} label="Department" />
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
            {rows.length} people
          </span>
        </Toolbar>

        {rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No one matches these filters.</p>
        ) : (
          <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
            {rows.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelected(e)}
                className="flex items-start gap-4 bg-card p-5 text-left transition-colors hover:bg-secondary/40"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-border text-[12px] tracking-[0.08em] text-gold">
                  {e.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm text-foreground">{e.name}</span>
                  <span className="mt-1 block truncate text-[12px] text-muted-foreground">{e.role}</span>
                  <span className="mt-2 block text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    {e.department} · {e.location}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </SectionCard>

      <Modal
        open={selected !== null}
        onOpenChange={(v) => { if (!v) setSelected(null); }}
        title={selected?.name ?? ""}
        description={selected ? `${selected.role} · ${selected.department}` : undefined}
      >
        {selected ? (
          <div className="space-y-5 text-sm">
            <div className="grid grid-cols-2 gap-4 text-[12px]">
              <div className="min-w-0">
                <div className="eyebrow">Email</div>
                <div className="mt-1 truncate text-foreground">{selected.email}</div>
              </div>
              <div>
                <div className="eyebrow">Location</div>
                <div className="mt-1 text-foreground">{selected.location}</div>
              </div>
              <div>
                <div className="eyebrow">Joined</div>
                <div className="mt-1 text-foreground">{formatDate(selected.joined)}</div>
              </div>
              <div>
                <div className="eyebrow">Open tasks</div>
                <div className="mt-1 text-foreground">{openTasks.length}</div>
              </div>
            </div>
            <div>
              <div className="eyebrow mb-2">Assigned projects</div>
              {projects.length === 0 ? (
                <p className="text-[12px] text-muted-foreground">Not currently staffed on a project.</p>
              ) : (
                <ul className="divide-y divide-border border border-border">
                  {projects.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3 px-3 py-2 text-[12px]">
                      <span className="min-w-0 truncate text-foreground">{p.name}</span>
                      <span className="shrink-0 text-muted-foreground">{p.status}</span>
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
