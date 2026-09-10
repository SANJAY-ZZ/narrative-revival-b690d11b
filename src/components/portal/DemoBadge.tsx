export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-border-strong px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
      Demo data
    </span>
  );
}
