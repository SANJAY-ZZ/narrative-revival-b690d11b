import { Link } from "@tanstack/react-router";

import { DOMAINS } from "@/data/mock";
import { useReveal } from "@/lib/orvnt";

/** Home-page index of the five ORVNT domains, each linking to its own page. */
export function DomainIndex() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="domains" className="wrap py-[12vh]">
      <div className="reveal max-w-2xl">
        <p className="eyebrow">Domains</p>
        <h2 className="display-lg mt-6">Five domains. One system.</h2>
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
            <span className="max-w-md text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              {d.headline}
            </span>
            <span className="text-[10px] tracking-[0.24em] uppercase">View domain →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
