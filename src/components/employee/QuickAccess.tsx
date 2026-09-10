import { Link } from "@tanstack/react-router";
import { FolderKanban, ListChecks, Clock, PalmtreeIcon, Users, FileText } from "lucide-react";

const TILES = [
  { to: "/employee/tasks", label: "My Tasks", icon: ListChecks },
  { to: "/employee/projects", label: "Projects", icon: FolderKanban },
  { to: "/employee/timesheet", label: "Timesheet", icon: Clock },
  { to: "/employee/leave", label: "Leave Requests", icon: PalmtreeIcon },
  { to: "/employee/team", label: "Team Directory", icon: Users },
  { to: "/employee/documents", label: "Documents", icon: FileText },
] as const;

export function QuickAccess() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {TILES.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className="group flex flex-col items-center gap-2 border border-border bg-card p-4 text-center transition-colors hover:border-[var(--gold)]"
        >
          <Icon size={18} className="text-muted-foreground transition-colors group-hover:text-[var(--gold)]" strokeWidth={1.5} />
          <span className="text-xs text-foreground">{label}</span>
        </Link>
      ))}
    </div>
  );
}
