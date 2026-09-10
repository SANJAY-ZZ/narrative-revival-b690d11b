import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";

/** Reusable portal table + filter primitives shared by admin and employee portals. */

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
  headClassName?: string;
}

export function SectionCard({
  title,
  subtitle,
  right,
  children,
  padded = true,
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <section className="border border-border bg-card">
      {title ? (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <h3 className="font-[family-name:var(--font-display)] text-base text-foreground">{title}</h3>
            {subtitle ? <p className="mt-1 text-[12px] text-muted-foreground">{subtitle}</p> : null}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
      ) : null}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative flex min-w-0 flex-1 items-center sm:max-w-xs">
      <Search size={14} className="pointer-events-none absolute left-3 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[var(--gold)]"
      />
    </div>
  );
}

export function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  label: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)]"
    >
      <option value="">{label}: All</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{children}</div>;
}

export function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block whitespace-nowrap border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]"
      style={{ borderColor: color, color }}
    >
      {label}
    </span>
  );
}

export function ProgressBar({ value, width = 64 }: { value: number; width?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 shrink-0 bg-secondary" style={{ width }}>
        <div className="h-full" style={{ width: `${value}%`, background: "var(--gold)" }} />
      </div>
      <span className="text-muted-foreground">{value}%</span>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <p className="px-5 py-10 text-center text-sm text-muted-foreground">{message}</p>;
}

export function DataTable<T extends { id?: string }>({
  columns,
  rows,
  rowKey,
  onRowClick,
  empty = "Nothing to show.",
  minWidth = 720,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  empty?: string;
  minWidth?: number;
}) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return rows;
    return [...rows].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * dir;
    });
  }, [rows, columns, sortKey, dir]);

  if (rows.length === 0) return <EmptyState message={empty} />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[12px]" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            {columns.map((c) => (
              <th key={c.key} className={`px-5 py-3 font-normal uppercase tracking-[0.08em] ${c.headClassName ?? ""}`}>
                {c.sortValue ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (sortKey === c.key) setDir(dir === 1 ? -1 : 1);
                      else {
                        setSortKey(c.key);
                        setDir(1);
                      }
                    }}
                    className="uppercase tracking-[0.08em] transition-colors hover:text-foreground"
                  >
                    {c.header}
                    {sortKey === c.key ? <span className="ml-1 text-gold">{dir === 1 ? "↑" : "↓"}</span> : null}
                  </button>
                ) : (
                  c.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-b border-border last:border-0 ${
                onRowClick ? "cursor-pointer hover:bg-secondary/40" : "hover:bg-secondary/20"
              }`}
            >
              {columns.map((c) => (
                <td key={c.key} className={`px-5 py-3 align-middle ${c.className ?? "text-muted-foreground"}`}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
