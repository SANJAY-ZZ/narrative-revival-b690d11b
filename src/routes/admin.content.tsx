import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { FilterSelect, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { WEBSITE_CONTENT } from "@/data/mock";

const TITLE = "Website Content — ORVNT Admin";
const DESC = "Edit the copy that powers the public ORVNT website (demo data).";

export const Route = createFileRoute("/admin/content")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminContent,
});

function AdminContent() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState("");
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(WEBSITE_CONTENT.map((b) => [b.key, b.value])),
  );
  const [dirty, setDirty] = useState<Record<string, true>>({});

  const pages = useMemo(() => [...new Set(WEBSITE_CONTENT.map((b) => b.page))], []);

  const blocks = useMemo(
    () =>
      WEBSITE_CONTENT.filter((b) => {
        const q = query.trim().toLowerCase();
        const matchesQuery = !q || b.label.toLowerCase().includes(q) || (values[b.key] ?? "").toLowerCase().includes(q);
        return matchesQuery && (!page || b.page === page);
      }),
    [query, page, values],
  );

  const dirtyCount = Object.keys(dirty).length;

  const reset = () => {
    setValues(Object.fromEntries(WEBSITE_CONTENT.map((b) => [b.key, b.value])));
    setDirty({});
    toast("Changes discarded");
  };

  const save = () => {
    setDirty({});
    toast.success(`${dirtyCount || "No"} block${dirtyCount === 1 ? "" : "s"} saved`, {
      description: "Demo only — copy is not persisted to a backend yet.",
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Website Content"
        description="Headlines and supporting copy for the public site, grouped by page."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <DemoBadge />
            <button
              type="button"
              onClick={reset}
              disabled={dirtyCount === 0}
              className="border border-border px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={save}
              disabled={dirtyCount === 0}
              className="border border-gold px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-[var(--ink)] disabled:opacity-40"
            >
              Save{dirtyCount ? ` (${dirtyCount})` : ""}
            </button>
          </div>
        }
      />

      <SectionCard>
        <Toolbar>
          <SearchInput value={query} onChange={setQuery} placeholder="Search copy…" />
          <FilterSelect value={page} onChange={setPage} options={pages} label="Page" />
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
            {blocks.length} blocks
          </span>
        </Toolbar>

        {blocks.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No content blocks match.</p>
        ) : (
          <div className="space-y-px bg-border">
            {blocks.map((b) => (
              <div key={b.key} className="bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="eyebrow">{b.page}</div>
                    <label htmlFor={b.key} className="mt-1 block text-sm text-foreground">
                      {b.label}
                    </label>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{b.key}</span>
                </div>
                {b.multiline ? (
                  <textarea
                    id={b.key}
                    rows={3}
                    value={values[b.key] ?? ""}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, [b.key]: e.target.value }));
                      setDirty((d) => ({ ...d, [b.key]: true }));
                    }}
                    className="mt-3 w-full resize-y border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)]"
                  />
                ) : (
                  <input
                    id={b.key}
                    value={values[b.key] ?? ""}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, [b.key]: e.target.value }));
                      setDirty((d) => ({ ...d, [b.key]: true }));
                    }}
                    className="mt-3 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)]"
                  />
                )}
                {dirty[b.key] ? <p className="mt-2 text-[11px] text-gold">Unsaved change</p> : null}
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
