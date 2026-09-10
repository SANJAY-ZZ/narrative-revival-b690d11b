import { Link } from "@tanstack/react-router";

import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { ProgressBar, StatusPill } from "@/components/public/ProjectCard";
import { domainBySlug, formatCurrency, formatDate } from "@/data/mock";
import { useReveal } from "@/lib/orvnt";
import type { Project } from "@/data/types";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t py-5" style={{ borderColor: "var(--color-border)" }}>
      <p className="text-[9px] tracking-[0.26em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 text-sm">{value}</p>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">{title}</p>
      <ul className="mt-6 flex flex-col">
        {items.map((it) => (
          <li key={it} className="flex gap-4 border-t py-4 text-sm" style={{ borderColor: "var(--color-border)" }}>
            <span className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: "var(--gold)" }} />
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  const ref = useReveal<HTMLDivElement>();
  const domain = domainBySlug(project.domain);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b pt-[20vh] pb-[10vh]" style={{ borderColor: "var(--color-border)" }}>
          <div className="wrap">
            <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
              <Link to="/domains/$slug" params={{ slug: project.domain }} className="transition-colors hover:text-gold">
                {domain?.name}
              </Link>
              <span className="h-px w-8 bg-border" />
              <span>{project.internal ? "Internal project" : project.client}</span>
            </div>

            <h1 className="display-xl mt-8 max-w-3xl">{project.name}</h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{project.overview}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <StatusPill status={project.status} />
              <span className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                Phase · {project.phase}
              </span>
            </div>

            <div className="mt-10 max-w-lg">
              <div className="flex items-baseline justify-between text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                <span>Progress</span>
                <span className="tabular-nums" style={{ color: "var(--gold)" }}>
                  {project.progress}%
                </span>
              </div>
              <div className="mt-3">
                <ProgressBar value={project.progress} />
              </div>
            </div>
          </div>
        </section>

        <div ref={ref} className="wrap grid gap-16 py-[12vh] lg:grid-cols-[1.4fr_0.6fr]">
          <div className="reveal flex flex-col gap-14">
            <List title="Objectives" items={project.objectives} />
            <List title="Deliverables" items={project.deliverables} />
            <div>
              <p className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Notes</p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{project.notes}</p>
            </div>
          </div>

          <aside className="reveal">
            <p className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Project detail</p>
            <div className="mt-6">
              <Meta label="Domain" value={domain?.name ?? project.domain} />
              <Meta label="Client" value={project.internal ? "ORVNT (internal)" : project.client} />
              <Meta label="Status" value={project.status} />
              <Meta label="Budget" value={formatCurrency(project.budget)} />
              <Meta label="Spent to date" value={formatCurrency(project.spent)} />
              <Meta label="Timeline" value={`${formatDate(project.startDate)} → ${formatDate(project.dueDate)}`} />
              <Meta label="Technologies" value={project.technologies.join(" · ")} />
            </div>
            <p className="mt-8 text-[9px] tracking-[0.22em] text-muted-foreground uppercase">
              Demo data — illustrative figures
            </p>
          </aside>
        </div>

        <section className="wrap border-t py-[12vh]" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="display-lg max-w-xl">Building something like this?</h2>
            <Link
              to="/contact"
              className="border px-10 py-5 text-[11px] tracking-[0.3em] uppercase transition-colors hover:bg-gold hover:text-ink"
              style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
            >
              Let's Build
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
