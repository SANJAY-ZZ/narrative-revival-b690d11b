import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { FilterSelect, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { EMPLOYEES, TASKS, formatDate } from "@/data/mock";

const TITLE = "Team Directory — ORVNT Employee Portal";
const DESC = "Find colleagues by department, role and location (demo data).";

export const Route = createFileRoute("/employee/team")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeTeam,
});

function EmployeeTeam() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");

  const departments = useMemo(() => [...new Set(EMPLOYEES.map((e) => e.department))], []);
  const people = EMPLOYEES.filter((e) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
    return matchesQuery && (!dept || e.department === dept);
  });

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Team Directory"
        description="Everyone at ORVNT, grouped by the domain they work in."
        actions={<DemoBadge />}
      />

      <SectionCard>
        <Toolbar>
          <SearchInput value={query} onChange={setQuery} placeholder="Search colleagues…" />
          <FilterSelect value={dept} onChange={setDept} options={departments} label="Department" />
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
            {people.length} people
          </span>
        </Toolbar>

        {people.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No one matches.</p>
        ) : (
          <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
            {people.map((e) => (
              <article key={e.id} className="bg-card p-5">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-border text-[12px] tracking-[0.08em] text-gold">
                    {e.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm text-foreground">{e.name}</h3>
                    <p className="mt-1 truncate text-[12px] text-muted-foreground">{e.role}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{e.department}</p>
                  </div>
                </div>
                <dl className="mt-4 space-y-1.5 text-[12px] text-muted-foreground">
                  <div className="flex min-w-0 items-center gap-2">
                    <Mail size={13} className="shrink-0" />
                    <a href={`mailto:${e.email}`} className="truncate transition-colors hover:text-gold">
                      {e.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="shrink-0" />
                    <span>{e.location}</span>
                  </div>
                </dl>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  Joined {formatDate(e.joined)} · {TASKS.filter((t) => t.assignee === e.id && t.status !== "Done").length} open
                  tasks
                </p>
              </article>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
