import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CURRENT_EMPLOYEE } from "@/data/mock";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border border-border px-2 py-1.5 transition-colors hover:border-gold"
      >
        <span
          className="flex h-6 w-6 items-center justify-center text-[10px] font-medium text-ink"
          style={{ background: "var(--gold)" }}
        >
          AD
        </span>
        <span className="hidden text-[12px] text-foreground sm:inline">Admin</span>
      </button>
      {open ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-56 border border-border bg-popover shadow-lg">
            <div className="border-b border-border px-4 py-3">
              <p className="text-[12px] text-foreground">Admin User</p>
              <p className="text-[11px] text-muted-foreground">{CURRENT_EMPLOYEE.email}</p>
            </div>
            <ul className="py-1">
              <li>
                <Link
                  to="/admin/settings"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-[12px] text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-[12px] text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Back to site
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
