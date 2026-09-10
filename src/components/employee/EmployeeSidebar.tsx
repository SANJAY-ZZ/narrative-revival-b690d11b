import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  FolderKanban,
  Users,
  Building2,
  FileBarChart,
  FileText,
  Clock,
  Megaphone,
  CalendarDays,
  PalmtreeIcon,
  Settings,
  Menu,
  X,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { Ring } from "@/components/orvnt/Ring";
import { CURRENT_EMPLOYEE } from "@/data/mock";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const NAV = [
  { to: "/employee", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/employee/tasks", label: "My Tasks", icon: ListChecks },
  { to: "/employee/projects", label: "Projects", icon: FolderKanban },
  { to: "/employee/team", label: "Team Directory", icon: Users },
  { to: "/employee/clients", label: "Clients", icon: Building2 },
  { to: "/employee/reports", label: "Reports", icon: FileBarChart },
  { to: "/employee/documents", label: "Documents", icon: FileText },
  { to: "/employee/timesheet", label: "Timesheet", icon: Clock },
  { to: "/employee/announcements", label: "Announcements", icon: Megaphone },
  { to: "/employee/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/employee/leave", label: "Leave Requests", icon: PalmtreeIcon },
  { to: "/employee/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
      {NAV.map(({ to, label, icon: Icon, exact }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: !!exact }}
          activeProps={{
            className: "bg-accent/10 text-foreground border-l-2 border-[var(--gold)]",
          }}
          className="flex items-center gap-3 border-l-2 border-transparent px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/5 hover:text-foreground"
        >
          <Icon size={16} strokeWidth={1.5} />
          <span className="truncate">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

function ProfileCard() {
  const e = CURRENT_EMPLOYEE;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 border-t border-border px-4 py-4 text-left transition-colors hover:bg-accent/5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-secondary text-xs font-medium text-foreground">
            {e.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-foreground">{e.name}</span>
            <span className="block truncate text-[11px] uppercase tracking-wider text-muted-foreground">{e.role}</span>
          </span>
          <ChevronUp size={14} className="text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-56">
        <div className="px-2 py-1.5 text-xs text-muted-foreground">{e.email}</div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/employee/settings">Profile & Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/">
            <LogOut className="mr-1" size={14} /> Back to site
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EmployeeSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-9 w-9 items-center justify-center border border-border bg-card text-foreground md:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="flex items-center gap-3 border-b border-border px-5 py-5">
          <Ring size={28} />
          <div className="leading-tight">
            <div className="font-[family-name:var(--font-display)] text-sm tracking-wide text-foreground">ORVNT</div>
            <div className="eyebrow text-[9px]">Employee Portal</div>
          </div>
        </div>
        <NavList />
        <ProfileCard />
      </aside>

      {/* mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 border-border bg-card p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-5 py-5">
              <div className="flex items-center gap-3">
                <Ring size={26} />
                <div className="leading-tight">
                  <div className="font-[family-name:var(--font-display)] text-sm tracking-wide text-foreground">ORVNT</div>
                  <div className="eyebrow text-[9px]">Employee Portal</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
            <ProfileCard />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
