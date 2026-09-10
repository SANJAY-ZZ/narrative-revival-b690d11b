import { Link } from "@tanstack/react-router";

import { CapabilityGrid } from "@/components/orvnt/Capabilities";
import { Ring } from "@/components/orvnt/Ring";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { ProjectCard } from "@/components/public/ProjectCard";
import { projectsByDomain } from "@/data/mock";
import { useReveal, usePointer } from "@/lib/orvnt";
import type { Domain } from "@/data/types";

function DomainHero({ domain }: { domain: Domain }) {
  const [ref, ptr] = usePointer<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b pt-[22vh] pb-[12vh]"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(700px circle at ${50 + ptr.x * 30}% ${40 + ptr.y * 30}%, color-mix(in oklab, var(--gold) 10%, transparent), transparent 62%)`,
          transition: "background 300ms linear",
        }}
      />
      <div className="wrap relative grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <div>
          <p className="eyebrow">
            {domain.index} / {domain.name}
          </p>
          <h1 className="display-xl mt-7 max-w-3xl">{domain.headline}</h1>
          <p className="mt-9 max-w-xl text-base leading-relaxed text-muted-foreground">{domain.description}</p>
          <div className="mt-11 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="border px-8 py-4 text-[11px] tracking-[0.28em] uppercase transition-colors hover:bg-gold hover:text-ink"
              style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
            >
              Let's Build
            </Link>
            <Link
              to="/"
              className="border border-border-strong px-8 py-4 text-[11px] tracking-[0.28em] uppercase transition-colors hover:border-gold hover:text-gold"
            >
              All Domains
            </Link>
          </div>
        </div>

        <div className="hidden justify-end lg:flex">
          <div
            style={{
              transform: `translate3d(${ptr.x * 12}px, ${ptr.y * 12}px, 0) rotate(${ptr.x * 8}deg)`,
              transition: "transform 400ms cubic-bezier(.16,.84,.44,1)",
            }}
          >
            <Ring size={150} className="opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DomainPage({ domain }: { domain: Domain }) {
  const ref = useReveal<HTMLDivElement>();
  const projects = projectsByDomain(domain.slug);

  return (
    <>
      <SiteHeader />
      <main>
        <DomainHero domain={domain} />

        <div ref={ref}>
          <section className="wrap py-[12vh]">
            <div className="reveal">
              <p className="eyebrow">Capabilities</p>
              <h2 className="display-lg mt-6 max-w-2xl">What we do inside {domain.name}.</h2>
            </div>
            <CapabilityGrid items={domain.capabilities} />
          </section>

          <section className="wrap border-t py-[12vh]" style={{ borderColor: "var(--color-border)" }}>
            <div className="reveal flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Projects</p>
                <h2 className="display-lg mt-6">Work in this domain.</h2>
              </div>
              <p className="max-w-xs text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                Demo data — illustrative engagements
              </p>
            </div>

            {projects.length ? (
              <div className="mt-[7vh] grid gap-px md:grid-cols-2 xl:grid-cols-3">
                {projects.map((p) => (
                  <div key={p.id} className="reveal">
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="reveal mt-[7vh] border p-14 text-center"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p className="font-[family-name:var(--font-display)] text-xl">No published work yet.</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Engagements in this domain are currently under wraps. Talk to us about what you're building.
                </p>
              </div>
            )}
          </section>

          <section className="wrap border-t py-[14vh]" style={{ borderColor: "var(--color-border)" }}>
            <div className="reveal max-w-2xl">
              <h2 className="display-lg">Have a problem worth solving?</h2>
              <p className="mt-7 text-base leading-relaxed text-muted-foreground">
                Tell us what you're trying to build, modernize or explore. We'll tell you how we'd approach it.
              </p>
              <Link
                to="/contact"
                className="mt-10 inline-block border px-10 py-5 text-[11px] tracking-[0.3em] uppercase transition-colors hover:bg-gold hover:text-ink"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
              >
                Let's Build
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
