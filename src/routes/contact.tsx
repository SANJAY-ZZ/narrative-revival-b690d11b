import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Ring } from "@/components/orvnt/Ring";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { CONTACT, DOMAINS } from "@/data/mock";

const TITLE = "Contact ORVNT — Have a problem worth solving?";
const DESC =
  "Talk to ORVNT about a technology partnership, a new product, an organization to modernize or a venture to explore.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const inputClass =
    "w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

  return (
    <>
      <SiteHeader />
      <Toaster />
      <main>
        <section className="border-b pt-[22vh] pb-[10vh]" style={{ borderColor: "var(--color-border)" }}>
          <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <p className="eyebrow">Let's Build</p>
              <h1 className="display-xl mt-7 max-w-3xl">Have a problem worth solving?</h1>
              <p className="mt-9 max-w-xl text-base leading-relaxed text-muted-foreground">
                Whether you need a technology partner, are building a new product, modernizing an organization, or
                exploring a new venture, connect with ORVNT.
              </p>
            </div>
            <div className="hidden justify-end lg:flex">
              <Ring size={130} className="opacity-80" />
            </div>
          </div>
        </section>

        <section className="wrap grid gap-16 py-[12vh] lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Message ready to send", {
                description: "This form is not connected to a mailbox yet — email us directly in the meantime.",
              });
            }}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-3">
                <span className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Name</span>
                <input required className={inputClass} style={{ borderColor: "var(--color-border)" }} placeholder="Your name" />
              </label>
              <label className="flex flex-col gap-3">
                <span className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Email</span>
                <input required type="email" className={inputClass} style={{ borderColor: "var(--color-border)" }} placeholder="you@company.com" />
              </label>
            </div>

            <label className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Domain of interest</span>
              <select className={inputClass} style={{ borderColor: "var(--color-border)" }} defaultValue={DOMAINS[0]!.slug}>
                {DOMAINS.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">What are you building?</span>
              <textarea
                required
                rows={6}
                className={inputClass}
                style={{ borderColor: "var(--color-border)" }}
                placeholder="A short description of the problem, the system or the venture."
              />
            </label>

            <button
              type="submit"
              className="self-start border px-10 py-5 text-[11px] tracking-[0.3em] uppercase transition-colors hover:bg-gold hover:text-ink"
              style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
            >
              {sent ? "Sent" : "Let's Build"}
            </button>

            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Form not connected yet — messages are not delivered
            </p>
          </form>

          <aside className="flex flex-col justify-start">
            <p className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Direct</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-baseline justify-between gap-6 border-t py-6 transition-colors hover:text-gold"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Email</span>
              <span className="text-sm">{CONTACT.email}</span>
            </a>
            {CONTACT.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="flex items-baseline justify-between gap-6 border-t py-6 transition-colors last:border-b hover:text-gold"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Phone</span>
                <span className="text-sm">{p}</span>
              </a>
            ))}
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
