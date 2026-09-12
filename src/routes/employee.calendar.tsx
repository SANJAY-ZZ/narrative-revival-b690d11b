import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { Pill, SectionCard } from "@/components/portal/table";
import { PRIORITY_COLORS } from "@/components/portal/status";
import { CURRENT_EMPLOYEE, LEAVE_REQUESTS, TASKS, formatDate, projectById } from "@/data/mock";
import { myProjects } from "@/components/employee/MyProjectsTable";

const TITLE = "Calendar — ORVNT Employee Portal";
const DESC = "Task deadlines, project milestones and approved leave in one month view (demo data).";

export const Route = createFileRoute("/employee/calendar")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeCalendar,
});

type CalEvent = { date: string; label: string; kind: "Task" | "Milestone" | "Leave" };

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function EmployeeCalendar() {
  const [month, setMonth] = useState(() => new Date("2026-09-01T00:00:00Z"));

  const events = useMemo<CalEvent[]>(() => {
    const list: CalEvent[] = [];
    TASKS.filter((t) => t.assignee === CURRENT_EMPLOYEE.id).forEach((t) =>
      list.push({ date: t.due, label: t.title, kind: "Task" }),
    );
    myProjects().forEach((p) => list.push({ date: p.dueDate, label: `${p.name} delivery`, kind: "Milestone" }));
    LEAVE_REQUESTS.filter((l) => l.status === "Approved").forEach((l) =>
      list.push({ date: l.from, label: `${l.type} leave`, kind: "Leave" }),
    );
    return list.sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  const year = month.getUTCFullYear();
  const m = month.getUTCMonth();
  const first = new Date(Date.UTC(year, m, 1));
  const daysInMonth = new Date(Date.UTC(year, m + 1, 0)).getUTCDate();
  const lead = (first.getUTCDay() + 6) % 7;
  const cells = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const iso = (day: number) => `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const monthLabel = first.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
  const shift = (delta: number) => setMonth(new Date(Date.UTC(year, m + delta, 1)));

  const upcoming = events.filter((e) => e.date >= "2026-09-01").slice(0, 8);

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Calendar"
        description="Deadlines, delivery milestones and approved leave."
        actions={<DemoBadge />}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <SectionCard
          title={monthLabel}
          subtitle="Demo schedule"
          right={
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => shift(-1)}
                className="border border-border p-1.5 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => shift(1)}
                className="border border-border p-1.5 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-7 gap-px bg-border text-[11px]">
            {WEEKDAYS.map((d) => (
              <div key={d} className="bg-card px-2 py-2 text-center uppercase tracking-[0.08em] text-muted-foreground">
                {d}
              </div>
            ))}
            {cells.map((day, i) => {
              const dayEvents = day ? events.filter((e) => e.date === iso(day)) : [];
              return (
                <div key={i} className="min-h-[84px] bg-card p-1.5 align-top">
                  {day ? (
                    <>
                      <span className="block text-right text-[11px] text-muted-foreground">{day}</span>
                      <ul className="mt-1 space-y-1">
                        {dayEvents.map((e, j) => (
                          <li
                            key={j}
                            title={e.label}
                            className="truncate border-l-2 pl-1.5 text-[10px] text-foreground"
                            style={{
                              borderColor:
                                e.kind === "Leave"
                                  ? "oklch(0.6 0.09 160)"
                                  : e.kind === "Milestone"
                                    ? "oklch(0.7 0.1 240)"
                                    : "var(--gold)",
                            }}
                          >
                            {e.label}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Upcoming" subtitle="Next deadlines and milestones">
          <ul className="space-y-4">
            {upcoming.map((e, i) => (
              <li key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0 text-[13px] text-foreground">{e.label}</span>
                  <Pill
                    label={e.kind}
                    color={
                      e.kind === "Leave"
                        ? "oklch(0.6 0.09 160)"
                        : e.kind === "Milestone"
                          ? "oklch(0.7 0.1 240)"
                          : PRIORITY_COLORS.Medium
                    }
                  />
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{formatDate(e.date)}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
