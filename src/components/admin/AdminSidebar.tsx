import { Link } from "@tanstack/react-router";
import { Ring } from "@/components/orvnt/Ring";
import { DemoBadge } from "@/components/portal/DemoBadge";

const NAV = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/content", label: "Website Content" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/clients", label: "Clients" },
  { to: "/admin/employees", label: "Employees" },
  { to: "/admin/budget", label: "Budget" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/tasks", label: "Tasks" },
  { to: "/admin/settings", label: "Settings" },
  { to: "/admin/activity", label: "Activity Log" },
] as const;

export function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* mobile scrim */}
      <div
        className="fixed inset-0 z-40 bg-ink/60 transition-opacity lg:hidden"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col border-r border-border bg-background transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0"
        style={{ transform: open ? "translateX(0)" : undefined }}
      >
        <div
          className="lg:hidden absolute inset-y-0 left-0 -z-10 w-full"
          style={{ display: "none" }}
        />
        <div className="flex items-center gap-3 border-b border-border px-6 py-5">
          <Ring size={26} />
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-display)] text-[13px] font-semibold tracking-[0.32em]">
              ORVNT
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Admin Portal</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  activeOptions={{ exact: item.exact }}
                  activeProps={{
                    className: "bg-secondary text-foreground border-gold",
                  }}
                  className="block border-l-2 border-transparent px-4 py-2.5 text-[12px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border px-6 py-5">
          <DemoBadge />
        </div>
      </aside>
    </>
  );
}
