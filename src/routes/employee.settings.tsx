import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { SectionCard } from "@/components/portal/table";
import { ThemeToggle } from "@/components/public/SiteHeader";
import { CURRENT_EMPLOYEE, formatDate } from "@/data/mock";

const TITLE = "Settings — ORVNT Employee Portal";
const DESC = "Your profile, appearance and notification preferences (demo data).";

export const Route = createFileRoute("/employee/settings")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeeSettings,
});

function EmployeeSettings() {
  const e = CURRENT_EMPLOYEE;
  const [name, setName] = useState(e.name);
  const [email, setEmail] = useState(e.email);
  const [location, setLocation] = useState(e.location);
  const [toggles, setToggles] = useState({
    taskAssigned: true,
    deadlineReminders: true,
    announcements: true,
    leaveUpdates: true,
  });

  return (
    <div>
      <PageHeader
        eyebrow="Employee Portal"
        title="Settings"
        description="Keep your profile current and choose what the portal tells you about."
        actions={<DemoBadge />}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Profile" subtitle={`${e.role} · joined ${formatDate(e.joined)}`}>
          <div className="mb-5 flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center border border-border text-sm tracking-[0.08em] text-gold">
              {e.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-foreground">{name}</p>
              <p className="truncate text-[12px] text-muted-foreground">{e.department}</p>
            </div>
          </div>
          <div className="space-y-4">
            <Field label="Full name" value={name} onChange={setName} />
            <Field label="Work email" value={email} onChange={setEmail} type="email" />
            <Field label="Location" value={location} onChange={setLocation} />
            <button
              type="button"
              onClick={() => toast.success("Profile saved", { description: "Demo only — not persisted." })}
              className="border border-gold px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-[var(--ink)]"
            >
              Save changes
            </button>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Appearance" subtitle="Remembered on this device">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Switch between the dark cinematic theme and the light daylight theme.
              </p>
              <ThemeToggle />
            </div>
          </SectionCard>

          <SectionCard title="Notifications" subtitle="What the portal alerts you about">
            <ul className="space-y-4">
              {(
                [
                  ["taskAssigned", "Task assigned to me"],
                  ["deadlineReminders", "Deadline reminders"],
                  ["announcements", "Company announcements"],
                  ["leaveUpdates", "Leave request updates"],
                ] as const
              ).map(([key, label]) => (
                <li key={key} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-foreground">{label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={toggles[key]}
                    aria-label={label}
                    onClick={() => setToggles((t) => ({ ...t, [key]: !t[key] }))}
                    className={`h-5 w-10 shrink-0 border transition-colors ${
                      toggles[key] ? "border-gold bg-[var(--gold)]/20" : "border-border bg-secondary"
                    }`}
                  >
                    <span
                      className={`block h-3.5 w-3.5 transition-transform ${toggles[key] ? "translate-x-5" : "translate-x-0.5"}`}
                      style={{ background: toggles[key] ? "var(--gold)" : "var(--color-border-strong)" }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[var(--gold)]"
      />
    </label>
  );
}
