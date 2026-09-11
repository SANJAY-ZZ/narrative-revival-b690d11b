import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { Pill, ProgressBar, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { PROJECT_STATUS_COLORS } from "@/components/portal/status";
import { myProjects } from "@/components/employee/MyProjectsTable";
import { CURRENT_EMPLOYEE, TASKS, domainName, formatDate } from "@/data/mock";

const TITLE = "Projects — ORVNT Employee Portal";
const DESC = "The engagements you are staffed on, with progress and your open work (demo data).";

export const Route = createFileRoute("/employee/projects")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeProjects,
});

function EmployeeProjects() {
  const [query, setQuery] = useState("");
  const all = myProjects();
  const q = query.trim().toLowerCase();
  const projects = all.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q),
  );

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Projects"
        description="Engagements you contribute to, and what is still open on each."
        actions={<DemoBadge />}
      />

      <SectionCard>
        <Toolbar>
          <SearchInput value={query} onChange={setQuery} placeholder="Search your projects…" />
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
            {projects.length} projects
          </span>
        </Toolbar>

        {projects.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No projects match.</p>
        ) : (
          <div className="grid gap-px bg-border lg:grid-cols-2">
            {projects.map((p) => {
              const mine = TASKS.filter((t) => t.projectId === p.id && t.assignee === CURRENT_EMPLOYEE.id);
              const open = mine.filter((t) => t.status !== "Done");
              return (
                <article key={p.id} className="bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="eyebrow">{domainName(p.domain)}</div>
                      <h3 className="mt-1 truncate font-[family-name:var(--font-display)] text-base text-foreground">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-[12px] text-muted-foreground">{p.client}</p>
                    </div>
                    <Pill label={p.status} color={PROJECT_STATUS_COLORS[p.status]} />
                  </div>

                  <p className="mt-3 line-clamp-2 text-[13px] text-muted-foreground">{p.description}</p>

                  <div className="mt-4 text-[12px]">
                    <ProgressBar value={p.progress} width={140} />
                  </div>

                  <dl className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
                    <div>
                      <dt className="eyebrow">Phase</dt>
                      <dd className="mt-1 text-foreground">{p.phase}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Due</dt>
                      <dd className="mt-1 text-foreground">{formatDate(p.dueDate)}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">My open tasks</dt>
                      <dd className="mt-1 text-foreground">{open.length}</dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to="/employee/tasks"
                      className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                    >
                      My tasks
                    </Link>
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: p.id }}
                      className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                    >
                      Public page
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
