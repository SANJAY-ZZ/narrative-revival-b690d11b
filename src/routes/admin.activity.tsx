import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createFileRoute as _r } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { FilterSelect, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { ACTIVITY } from "@/data/mock";

const TITLE = "Activity Log — ORVNT Admin";
const DESC = "Chronological record of changes made across the ORVNT portal (demo data).";

export const Route = createFileRoute("/admin/activity")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminActivity,
});

function AdminActivity() {
  const [query, setQuery] = useState("");
  const [actor, setActor] = useState("");

  const actors = useMemo(() => [...new Set(ACTIVITY.map((a) => a.actor))], []);

  const rows = useMemo(
    () =>
      ACTIVITY.filter((a) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q || a.target.toLowerCase().includes(q) || a.action.toLowerCase().includes(q) || a.actor.toLowerCase().includes(q);
        return matchesQuery && (!actor || a.actor === actor);
      }),
    [query, actor],
  );

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Activity Log"
        description="Who changed what, and when, across projects, clients, budget and content."
        actions={<DemoBadge />}
      />

      <SectionCard>
        <Toolbar>
          <SearchInput value={query} onChange={setQuery} placeholder="Search activity…" />
          <FilterSelect value={actor} onChange={setActor} options={actors} label="Person" />
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
            {rows.length} events
          </span>
        </Toolbar>

        {rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No activity matches.</p>
        ) : (
          <ol className="relative border-l border-border pl-6">
            {rows.map((a) => (
              <li key={a.id} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[27px] top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                <p className="text-sm text-foreground">
                  <span className="text-gold">{a.actor}</span> {a.action}{" "}
                  <span className="text-foreground">{a.target}</span>
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{a.at}</p>
              </li>
            ))}
          </ol>
        )}
      </SectionCard>
    </div>
  );
}
