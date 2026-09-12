import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { DataTable, FilterSelect, SearchInput, SectionCard, Toolbar } from "@/components/portal/table";
import { DOCUMENTS, formatDate } from "@/data/mock";
import type { DocumentItem } from "@/data/types";

const TITLE = "Documents — ORVNT Employee Portal";
const DESC = "Handbooks, templates and architecture references for the team (demo data).";

export const Route = createFileRoute("/employee/documents")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeDocuments,
});

function EmployeeDocuments() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const types = useMemo(() => [...new Set(DOCUMENTS.map((d) => d.type))], []);
  const q = query.trim().toLowerCase();
  const rows = DOCUMENTS.filter(
    (d) => (!q || d.name.toLowerCase().includes(q) || d.owner.toLowerCase().includes(q)) && (!type || d.type === type),
  );

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Documents"
        description="Shared references maintained by domain leads."
        actions={<DemoBadge />}
      />

      <SectionCard padded={false}>
        <div className="p-5 pb-0">
          <Toolbar>
            <SearchInput value={query} onChange={setQuery} placeholder="Search documents…" />
            <FilterSelect value={type} onChange={setType} options={types} label="Type" />
            <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:ml-auto">
              {rows.length} files
            </span>
          </Toolbar>
        </div>
        <DataTable<DocumentItem>
          rows={rows}
          rowKey={(d) => d.id}
          empty="No documents match."
          minWidth={640}
          columns={[
            {
              key: "name",
              header: "Document",
              sortValue: (d) => d.name,
              render: (d) => (
                <span className="flex min-w-0 items-center gap-3">
                  <FileText size={15} className="shrink-0 text-muted-foreground" />
                  <span className="truncate text-foreground">{d.name}</span>
                </span>
              ),
            },
            { key: "type", header: "Type", sortValue: (d) => d.type, render: (d) => d.type },
            { key: "size", header: "Size", render: (d) => d.size },
            { key: "owner", header: "Owner", sortValue: (d) => d.owner, render: (d) => d.owner },
            { key: "updated", header: "Updated", sortValue: (d) => d.updated, render: (d) => formatDate(d.updated) },
            {
              key: "action",
              header: "",
              render: (d) => (
                <button
                  type="button"
                  onClick={() => toast(`"${d.name}"`, { description: "Demo only — no file is attached yet." })}
                  className="whitespace-nowrap border border-border px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  Open
                </button>
              ),
            },
          ]}
        />
      </SectionCard>
    </div>
  );
}
