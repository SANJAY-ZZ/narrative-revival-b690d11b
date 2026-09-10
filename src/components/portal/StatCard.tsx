export function StatCard({
  label,
  value,
  change,
  period,
}: {
  label: string;
  value: string;
  change?: string;
  period?: string;
}) {
  const positive = change?.trim().startsWith("+");
  return (
    <div className="border border-border bg-card p-5">
      <div className="eyebrow">{label}</div>
      <div className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight text-foreground">
        {value}
      </div>
      {change ? (
        <div className="mt-2 flex items-center gap-2 text-[11px]">
          <span style={{ color: positive ? "var(--gold)" : "var(--color-destructive)" }}>{change}</span>
          {period ? <span className="text-muted-foreground">{period}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
