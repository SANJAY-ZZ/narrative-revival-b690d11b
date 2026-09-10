import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Ring } from "@/components/orvnt/Ring";
import { DemoDataBadge } from "@/components/portal/DemoDataBadge";
import { ANNOUNCEMENTS } from "@/data/mock";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function EmployeeHeader() {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-[var(--header-bg)] px-4 py-3 backdrop-blur md:px-8">
      <div className="hidden md:block">
        <DemoDataBadge />
      </div>
      <div className="relative ml-auto flex max-w-xs flex-1 items-center">
        <Search size={14} className="pointer-events-none absolute left-3 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks, projects, people…"
          className="w-full border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[var(--gold)]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex h-9 w-9 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground" aria-label="Notifications">
            <Bell size={16} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--gold)] text-[9px] font-semibold text-[var(--ink)]">
              {ANNOUNCEMENTS.length}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel className="text-xs uppercase tracking-widest text-muted-foreground">Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ANNOUNCEMENTS.map((a) => (
            <DropdownMenuItem key={a.id} className="flex flex-col items-start gap-0.5 whitespace-normal">
              <span className="text-sm text-foreground">{a.title}</span>
              <span className="text-xs text-muted-foreground">{a.date}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden shrink-0 items-center justify-center border border-border p-1.5 sm:flex">
        <Ring size={20} />
      </div>
    </header>
  );
}
