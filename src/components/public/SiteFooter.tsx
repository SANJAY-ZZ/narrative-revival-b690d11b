import { Link } from "@tanstack/react-router";

import { Ring } from "@/components/orvnt/Ring";
import { CONTACT, DOMAINS } from "@/data/mock";

export function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="wrap grid gap-12 py-[9vh] md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Ring size={26} />
            <span className="font-[family-name:var(--font-display)] text-[14px] font-semibold tracking-[0.38em]">
              ORVNT
            </span>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Building useful software, intelligent systems and new ventures.
          </p>
          <p className="mt-6 text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
            Build · Intelligence · Impact
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Domains</p>
          <ul className="mt-6 flex flex-col gap-3">
            {DOMAINS.map((d) => (
              <li key={d.slug}>
                <Link
                  to="/domains/$slug"
                  params={{ slug: d.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Connect</p>
          <ul className="mt-6 flex flex-col gap-3 text-sm">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="text-muted-foreground transition-colors hover:text-gold">
                {CONTACT.email}
              </a>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p}>
                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="text-muted-foreground transition-colors hover:text-gold"
                >
                  {p}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                About ORVNT
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-wrap items-center justify-between gap-4 border-t py-6" style={{ borderColor: "var(--color-border)" }}>
        <span className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
          © {new Date().getUTCFullYear()} ORVNT
        </span>
        <span className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
          Build · Intelligence · Impact
        </span>
      </div>
    </footer>
  );
}
