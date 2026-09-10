import type { ReactNode } from "react";

export function StatCard({ label, value, sub, icon }: { label: string; value: ReactNode; sub?: string; icon?: ReactNode }) {
  return (
    <div className="border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <span className="eyebrow">{label}</span>
        {icon ? <span className="text-[var(--gold)]">{icon}</span> : null}
      </div>
      <div className="mt-3 font-[family-name:var(--font-display)] text-3xl text-foreground">{value}</div>
      {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
    </div>
  );
}
