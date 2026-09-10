import { Info } from "lucide-react";

/** Subtle indicator that all data on screen is illustrative mock data. */
export function DemoDataBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
      <Info size={11} />
      Demo data
    </span>
  );
}
