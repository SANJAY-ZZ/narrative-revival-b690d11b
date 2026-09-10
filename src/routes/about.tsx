import { createFileRoute, Link } from "@tanstack/react-router";

import { Ring } from "@/components/orvnt/Ring";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { DOMAINS } from "@/data/mock";
import { useReveal } from "@/lib/orvnt";

const TITLE = "About ORVNT — One company, five domains";
const DESC =
  "ORVNT operates as a single technology system across software, artificial intelligence, enterprise, digital and new ventures.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

const PRINCIPLES = [
  { t: "Systems, not deliverables", d: "We build things that keep working after we leave — architecture, contracts, tooling and the discipline behind them." },
  { t: "Intelligence with a job", d: "Models and agents earn their place by changing a real outcome, not by demonstrating novelty." },
  { t: "Modernization without rupture", d: "Enterprise change lands in waves, with the organization able to operate through every one of them." },
  { t: "Ownership of the future", d: "Where a category doesn't exist yet, we're willing to fund, found and operate it ourselves." },
];

function AboutPage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b pt-[22vh] pb-[12vh]" style={{ borderColor: "var(--color-border)" }}>
          <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <p className="eyebrow">About ORVNT</p>
              <h1 className="display-xl mt-7 max-w-3xl">Building technology across today and tomorrow.</h1>
              <p className="mt-9 max-w-xl text-base leading-relaxed text-muted-foreground">
                ORVNT builds useful software and intelligent systems, helps organizations modernize, creates digital
                products, and explores new opportunities through technology and innovation.
              </p>
            </div>
            <div className="hidden justify-end lg:flex">
              <Ring size={140} className="opacity-80" />
            </div>
          </div>
        </section>

        <div ref={ref}>
          <section className="wrap py-[12vh]">
            <div className="reveal max-w-2xl">
              <p className="eyebrow">The name</p>
              <h2 className="display-lg mt-6">Five movements. One system.</h2>
            </div>
            <div className="reveal mt-[7vh] grid border-t border-l sm:grid-cols-2 lg:grid-cols-5" style={{ borderColor: "var(--color-border)" }}>
              {[
                ["O", "Orchestrate", "The Core"],
                ["R", "Refine", "Intelligence"],
                ["V", "Vision", "& Value"],
                ["N", "Navigate", "Change"],
                ["T", "Transform", "The Future"],
              ].map(([ch, word, sub]) => (
                <div key={ch} className="border-r border-b p-8" style={{ borderColor: "var(--color-border)" }}>
                  <span className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight">
                    {ch}
                  </span>
                  <p className="mt-6 text-[10px] tracking-[0.24em] uppercase" style={{ color: "var(--gold)" }}>
                    {word}
                  </p>
                  <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{sub}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wrap border-t py-[12vh]" style={{ borderColor: "var(--color-border)" }}>
            <div className="reveal max-w-2xl">
              <p className="eyebrow">How we operate</p>
              <h2 className="display-lg mt-6">Principles that survive contact with delivery.</h2>
            </div>
            <div className="reveal mt-[7vh] grid gap-px md:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.t} className="border p-8" style={{ borderColor: "var(--color-border)" }}>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight">{p.t}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wrap border-t py-[12vh]" style={{ borderColor: "var(--color-border)" }}>
            <div className="reveal max-w-2xl">
              <p className="eyebrow">Domains</p>
              <h2 className="display-lg mt-6">Where the work happens.</h2>
            </div>
            <div className="reveal mt-[7vh] flex flex-col">
              {DOMAINS.map((d) => (
                <Link
                  key={d.slug}
                  to="/domains/$slug"
                  params={{ slug: d.slug }}
                  className="group flex flex-wrap items-baseline justify-between gap-6 border-t py-8 transition-colors last:border-b hover:text-gold"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <span className="flex items-baseline gap-6">
                    <span className="text-[10px] tracking-[0.24em] text-muted-foreground tabular-nums">{d.index}</span>
                    <span className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight sm:text-3xl">
                      {d.name}
                    </span>
                  </span>
                  <span className="text-[10px] tracking-[0.24em] uppercase">View domain →</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
