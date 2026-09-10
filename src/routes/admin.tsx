import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { NotificationPanel } from "@/components/portal/NotificationPanel";
import { ProfileMenu } from "@/components/portal/ProfileMenu";
import { Toaster } from "@/components/ui/sonner";

const TITLE = "ORVNT Admin Portal";
const DESC = "Internal admin portal for managing ORVNT projects, clients, employees and operations (demo data).";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground" data-theme-scope="admin">
      <AdminSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-5 py-3 backdrop-blur">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center border border-border text-foreground lg:hidden"
          >
            <MenuIcon />
          </button>
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground lg:hidden">Admin</span>
          <div className="ml-auto flex items-center gap-3">
            <NotificationPanel />
            <ProfileMenu />
          </div>
        </header>
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
