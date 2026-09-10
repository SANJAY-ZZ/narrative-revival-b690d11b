import { useRef } from "react";
import { useReveal, prefersReducedMotion } from "@/lib/orvnt";
import { Ring } from "./Ring";

/** Button that leans toward the cursor. */
function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.28;
    const y = (e.clientY - r.top - r.height / 2) * 0.4;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="group relative inline-flex items-center gap-4 border px-10 py-5 text-[11px] tracking-[0.3em] uppercase transition-[transform,border-color,color] duration-500 hover:text-ink"
      style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
    >
      <span
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-600 group-hover:scale-x-100"
        style={{ background: "var(--gold)", transitionTimingFunction: "var(--ease)" }}
      />
      <span className="relative">{children}</span>
      <span className="relative h-px w-8 transition-all duration-500 group-hover:w-12" style={{ background: "currentColor" }} />
    </a>
  );
}

export function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden pt-[16vh] pb-[8vh]">
      <div className="wrap">
        <div className="reveal grid gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow">07 / Let's Build</p>
            <h2 className="display-xl mt-6">Have a problem worth solving?</h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Whether you need a technology partner, are building a new product, modernizing an organization, or
              exploring a new venture, connect with ORVNT.
            </p>
            <div className="mt-12">
              <MagneticCTA href="mailto:admin.orvnt@gmail.com">Let's Build</MagneticCTA>
            </div>
          </div>

          <div className="reveal flex flex-col justify-end">
            {[
              { k: "Email", v: "admin.orvnt@gmail.com", href: "mailto:admin.orvnt@gmail.com" },
              { k: "Phone", v: "+91 63697 39598", href: "tel:+916369739598" },
              { k: "Phone", v: "+91 70104 11200", href: "tel:+917010411200" },
            ].map((row, i) => (
              <a
                key={i}
                href={row.href}
                className="group flex items-baseline justify-between gap-6 border-t py-6 last:border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">{row.k}</span>
                <span className="font-[family-name:var(--font-display)] text-base transition-colors duration-300 group-hover:text-gold sm:text-lg">
                  {row.v}
                </span>
              </a>
            ))}
          </div>

        </div>

        <footer className="hairline mt-[14vh] flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Ring size={20} />
            <span className="font-[family-name:var(--font-display)] text-[12px] font-semibold tracking-[0.34em]">
              ORVNT
            </span>
          </div>
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
            Build · Intelligence · Impact
          </p>
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            © {new Date().getFullYear()} ORVNT
          </p>
        </footer>
      </div>
    </section>
  );
}
