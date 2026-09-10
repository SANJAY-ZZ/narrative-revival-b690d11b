import type { TimesheetEntry } from "@/data/types";

export function TimesheetChart({ entries }: { entries: TimesheetEntry[] }) {
  const max = Math.max(...entries.map((e) => e.hours), 1);
  const total = entries.reduce((s, e) => s + e.hours, 0);

  return (
    <div className="border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="eyebrow">My Timesheet — This Week</span>
        <span className="text-xs text-muted-foreground">{total.toFixed(1)}h logged</span>
      </div>
      <div className="flex h-36 items-end gap-3">
        {entries.map((e) => (
          <div key={e.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-28 w-full items-end bg-secondary/40">
              <div
                className="w-full bg-[var(--gold)] transition-all"
                style={{ height: `${(e.hours / max) * 100}%` }}
                title={`${e.hours}h`}
              />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{e.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
