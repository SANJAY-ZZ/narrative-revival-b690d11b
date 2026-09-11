import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, Clock, FolderKanban } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { StatCard } from "@/components/employee/StatCard";
import { MyProjectsTable, myProjects } from "@/components/employee/MyProjectsTable";
import { TaskSummaryBars } from "@/components/employee/TaskSummaryBars";
import { TimesheetChart } from "@/components/employee/TimesheetChart";
import { UpcomingDeadlines } from "@/components/employee/UpcomingDeadlines";
import { AnnouncementsList } from "@/components/employee/AnnouncementsList";
import { QuickAccess } from "@/components/employee/QuickAccess";
import { AttendancePanel } from "@/components/employee/AttendancePanel";
import { CURRENT_EMPLOYEE, TASKS, TIMESHEET } from "@/data/mock";

const TITLE = "Dashboard — ORVNT Employee Portal";
const DESC = "Your tasks, projects, hours and announcements at ORVNT (demo data).";

export const Route = createFileRoute("/employee/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeDashboard,
});

function EmployeeDashboard() {
  const myTasks = TASKS.filter((t) => t.assignee === CURRENT_EMPLOYEE.id);
  const open = myTasks.filter((t) => t.status !== "Done");
  const done = myTasks.length - open.length;
  const hours = TIMESHEET.reduce((s, t) => s + t.hours, 0);
  const projects = myProjects();

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title={`Welcome back, ${CURRENT_EMPLOYEE.name.split(" ")[0]}`}
        description={`${CURRENT_EMPLOYEE.role} · ${CURRENT_EMPLOYEE.department}`}
        actions={<DemoBadge />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open tasks" value={open.length} sub="Assigned to you" icon={<Clock size={16} />} />
        <StatCard label="Completed" value={done} sub="This cycle" icon={<CheckCircle2 size={16} />} />
        <StatCard label="Projects" value={projects.length} sub="You are staffed on" icon={<FolderKanban size={16} />} />
        <StatCard label="Hours logged" value={`${hours}h`} sub="Current week" icon={<CalendarClock size={16} />} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <MyProjectsTable />
          <TaskSummaryBars tasks={myTasks} />
          <TimesheetChart entries={TIMESHEET} />
        </div>
        <div className="space-y-6">
          <AttendancePanel />
          <UpcomingDeadlines />
          <AnnouncementsList compact />
          <QuickAccess />
        </div>
      </div>
    </div>
  );
}
