import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { FilterSelect, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { ANNOUNCEMENTS, formatDate } from "@/data/mock";

const TITLE = "Announcements — ORVNT Employee Portal";
const DESC = "Company-wide updates from platform, operations and ventures (demo data).";

export const Route = createFileRoute("/employee/announcements")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeAnnouncements,
});

function EmployeeAnnouncements() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [read, setRead] = useState<Record<string, true>>({});

  const tags = useMemo(() => [...new Set(ANNOUNCEMENTS.map((a) => a.tag))], []);
  const q = query.trim().toLowerCase();
  const rows = ANNOUNCEMENTS.filter(
    (a) => (!q || a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q)) && (!tag || a.tag === tag),
  );

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Announcements"
        description="What changed across the company this cycle."
        actions={<DemoBadge />}
      />

      <SectionCard>
        <Toolbar>
          <SearchInput value={query} onChange={setQuery} placeholder="Search announcements…" />
          <FilterSelect value={tag} onChange={setTag} options={tags} label="Topic" />
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
            {rows.filter((a) => !read[a.id]).length} unread
          </span>
        </Toolbar>

        {rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No announcements match.</p>
        ) : (
          <div className="space-y-px bg-border">
            {rows.map((a) => (
              <article key={a.id} className="bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="eyebrow">{a.tag}</div>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-base text-foreground">{a.title}</h3>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{formatDate(a.date)}</span>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{a.body}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{a.author}</span>
                  <button
                    type="button"
                    onClick={() => setRead((r) => ({ ...r, [a.id]: true }))}
                    disabled={!!read[a.id]}
                    className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
                  >
                    {read[a.id] ? "Read" : "Mark as read"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
