import { useState } from "react";
import { ACTIVITY } from "@/data/mock";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const items = ACTIVITY.slice(0, 5);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
      >
        <BellIcon />
        <span
          className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--gold)" }}
        />
      </button>
      {open ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 border border-border bg-popover shadow-lg">
            <div className="border-b border-border px-4 py-3">
              <span className="eyebrow">Notifications</span>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {items.map((a) => (
                <li key={a.id} className="border-b border-border px-4 py-3 text-[12px] last:border-0">
                  <p className="text-foreground">
                    <span className="text-gold">{a.actor}</span> {a.action}{" "}
                    <span className="text-foreground">{a.target}</span>
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{a.at}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
