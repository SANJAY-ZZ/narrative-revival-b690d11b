import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { StatCard } from "@/components/portal/StatCard";
import { DataTable, Pill, SectionCard } from "@/components/portal/table";
import { LEAVE_REQUESTS, formatDate } from "@/data/mock";
import type { LeaveRequest } from "@/data/types";

const TITLE = "Leave Requests — ORVNT Employee Portal";
const DESC = "Request time off and track approvals and remaining balance (demo data).";

export const Route = createFileRoute("/employee/leave")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeLeave,
});

const STATUS_COLORS: Record<LeaveRequest["status"], string> = {
  Approved: "oklch(0.6 0.09 160)",
  Pending: "var(--gold)",
  Rejected: "oklch(0.577 0.245 27.325)",
};

const TYPES: LeaveRequest["type"][] = ["Annual", "Sick", "Personal", "Unpaid"];

function daysBetween(from: string, to: string) {
  const a = new Date(from + "T00:00:00Z").getTime();
  const b = new Date(to + "T00:00:00Z").getTime();
  return Math.max(1, Math.round((b - a) / 86400000) + 1);
}

function EmployeeLeave() {
  const [requests, setRequests] = useState<LeaveRequest[]>(() => LEAVE_REQUESTS.map((r) => ({ ...r })));
  const [type, setType] = useState<LeaveRequest["type"]>("Annual");
  const [from, setFrom] = useState("2026-10-26");
  const [to, setTo] = useState("2026-10-28");
  const [reason, setReason] = useState("");

  const used = requests.filter((r) => r.status === "Approved").reduce((s, r) => s + daysBetween(r.from, r.to), 0);
  const pending = requests.filter((r) => r.status === "Pending").length;
  const allowance = 24;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from > to) {
      toast.error("End date must be after the start date");
      return;
    }
    const next: LeaveRequest = {
      id: `lv-${Date.now()}`,
      type,
      from,
      to,
      reason: reason.trim() || "—",
      status: "Pending",
    };
    setRequests((r) => [next, ...r]);
    setReason("");
    toast.success("Leave request submitted", { description: "Demo only — not sent to an approver." });
  };

  const cancel = (id: string) => {
    setRequests((r) => r.filter((x) => x.id !== id));
    toast("Request withdrawn");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Leave Requests"
        description="Book time off and track where each request sits."
        actions={<DemoBadge />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Allowance" value={`${allowance} days`} period="2026" />
        <StatCard label="Taken" value={`${used} days`} period="Approved" />
        <StatCard label="Remaining" value={`${allowance - used} days`} period="Available" />
        <StatCard label="Pending" value={String(pending)} period="Awaiting approval" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <SectionCard title="New request" subtitle="Submissions route to your delivery lead">
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="eyebrow">Type</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as LeaveRequest["type"])}
                className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)]"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow">From</span>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)]"
                />
              </label>
              <label className="block">
                <span className="eyebrow">To</span>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)]"
                />
              </label>
            </div>
            <label className="block">
              <span className="eyebrow">Reason</span>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optional context for your lead"
                className="mt-2 w-full resize-y border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)]"
              />
            </label>
            <p className="text-[11px] text-muted-foreground">{daysBetween(from, to)} working day(s) requested.</p>
            <button
              type="submit"
              className="border border-gold px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-[var(--ink)]"
            >
              Submit request
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Your requests" subtitle="Most recent first" padded={false}>
          <DataTable<LeaveRequest>
            rows={requests}
            rowKey={(r) => r.id}
            minWidth={560}
            empty="No leave requested yet."
            columns={[
              { key: "type", header: "Type", sortValue: (r) => r.type, render: (r) => <span className="text-foreground">{r.type}</span> },
              {
                key: "dates",
                header: "Dates",
                sortValue: (r) => r.from,
                render: (r) => `${formatDate(r.from)} → ${formatDate(r.to)}`,
              },
              { key: "days", header: "Days", render: (r) => daysBetween(r.from, r.to) },
              { key: "reason", header: "Reason", render: (r) => <span className="line-clamp-1">{r.reason}</span> },
              {
                key: "status",
                header: "Status",
                sortValue: (r) => r.status,
                render: (r) => <Pill label={r.status} color={STATUS_COLORS[r.status]} />,
              },
              {
                key: "action",
                header: "",
                render: (r) =>
                  r.status === "Pending" ? (
                    <button
                      type="button"
                      onClick={() => cancel(r.id)}
                      className="whitespace-nowrap border border-border px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                    >
                      Withdraw
                    </button>
                  ) : null,
              },
            ]}
          />
        </SectionCard>
      </div>
    </div>
  );
}
