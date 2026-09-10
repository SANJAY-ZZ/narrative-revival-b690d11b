import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/portal/PageHeader";
import { DemoBadge } from "@/components/portal/DemoBadge";
import { SectionCard } from "@/components/portal/table";
import { ThemeToggle } from "@/components/portal/ThemeToggle";
import { CONTACT } from "@/data/mock";

const TITLE = "Settings — ORVNT Admin";
const DESC = "Organisation profile, appearance and notification preferences (demo data).";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  const [org, setOrg] = useState("ORVNT");
  const [email, setEmail] = useState(CONTACT.email);
  const [phone, setPhone] = useState(CONTACT.phones[0] ?? "");
  const [toggles, setToggles] = useState({
    weeklyDigest: true,
    budgetAlerts: true,
    taskMentions: false,
    publicFormAlerts: true,
  });

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Settings"
        description="Organisation details, appearance and how the portal notifies you."
        actions={<DemoBadge />}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Organisation" subtitle="Shown on the public site and in reports">
          <div className="space-y-4">
            <Field label="Organisation name" value={org} onChange={setOrg} />
            <Field label="Contact email" value={email} onChange={setEmail} type="email" />
            <Field label="Contact phone" value={phone} onChange={setPhone} />
            <button
              type="button"
              onClick={() => toast.success("Organisation profile saved", { description: "Demo only — not persisted." })}
              className="border border-gold px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-[var(--ink)]"
            >
              Save changes
            </button>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Appearance" subtitle="Theme preference is remembered on this device">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Switch between the deep-black cinematic theme and the off-white daylight theme.
              </p>
              <ThemeToggle />
            </div>
          </SectionCard>

          <SectionCard title="Notifications" subtitle="Portal alerts for this account">
            <ul className="space-y-4">
              {(
                [
                  ["weeklyDigest", "Weekly portfolio digest"],
                  ["budgetAlerts", "Budget threshold alerts"],
                  ["taskMentions", "Task mentions and assignments"],
                  ["publicFormAlerts", "Public contact form submissions"],
                ] as const
              ).map(([key, label]) => (
                <li key={key} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-foreground">{label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={toggles[key]}
                    aria-label={label}
                    onClick={() => {
                      setToggles((t) => ({ ...t, [key]: !t[key] }));
                      toast(`${label}: ${toggles[key] ? "off" : "on"}`);
                    }}
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
