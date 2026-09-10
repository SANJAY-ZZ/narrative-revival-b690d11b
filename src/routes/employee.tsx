import { createFileRoute, Outlet } from "@tanstack/react-router";
import { EmployeeSidebar } from "@/components/employee/EmployeeSidebar";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { AttendanceProvider } from "@/components/employee/attendance-context";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/employee")({
  head: () => ({
    meta: [
      { title: "Employee Portal — ORVNT" },
      { name: "description", content: "ORVNT employee workspace: tasks, projects, timesheets and team resources." },
      { property: "og:title", content: "Employee Portal — ORVNT" },
      { property: "og:description", content: "ORVNT employee workspace: tasks, projects, timesheets and team resources." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeLayout,
});

function EmployeeLayout() {
  return (
    <AttendanceProvider>
      <div className="min-h-screen bg-background text-foreground">
        <EmployeeSidebar />
        <div className="flex min-h-screen flex-col md:pl-64">
          <EmployeeHeader />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </AttendanceProvider>
  );
}
