import { Link } from "@tanstack/react-router";

import { formatCurrency, formatDate } from "@/data/mock";
import type { Project, ProjectStatus } from "@/data/types";

export function StatusPill({ status }: { status: ProjectStatus }) {
  const gold = status === "In Progress" || status === "In Review";
  return (
    <span
      className="border px-3 py-1 text-[9px] tracking-[0.22em] uppercase"
      style={{
        borderColor: gold ? "color-mix(in oklab, var(--gold) 55%, transparent)" : "var(--color-border)",
        color: gold ? "var(--gold)" : "var(--color-muted-foreground)",
      }}
    >
      {status}
    </span>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <span className="block h-px w-full bg-border">
      <span
        className="block h-px origin-left"
        style={{ background: "var(--gold)", transform: `scaleX(${Math.max(0, Math.min(1, value / 100))})` }}
      />
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="group flex h-full flex-col justify-between border p-7 transition-colors duration-500 hover:border-gold sm:p-8"
      style={{
        borderColor: "var(--color-border)",
        background: "color-mix(in oklab, var(--color-card) 55%, transparent)",
      }}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={project.status} />
          <span className="text-[9px] tracking-[0.22em] text-muted-foreground uppercase">
            {project.internal ? "Internal" : "Client"}
          </span>
        </div>

        <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-3 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">{project.client}</p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((t) => (
            <span
              key={t}
              className="border px-2.5 py-1 text-[9px] tracking-[0.16em] text-muted-foreground uppercase"
              style={{ borderColor: "var(--color-border)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-9">
        <div className="flex items-baseline justify-between text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <span>Progress</span>
          <span className="tabular-nums" style={{ color: "var(--gold)" }}>
            {project.progress}%
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={project.progress} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          <span>Budget · {formatCurrency(project.budget)}</span>
          <span className="text-right">Due · {formatDate(project.dueDate)}</span>
        </div>
      </div>
    </Link>
  );
}
