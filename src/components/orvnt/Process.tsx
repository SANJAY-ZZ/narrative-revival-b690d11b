import { useSectionProgress, clamp } from "@/lib/orvnt";

const STAGES = [
  { n: "01", t: "Discover", d: "Problem framing, constraints, users, data and the outcome that matters." },
  { n: "02", t: "Architect", d: "Systems design, technical direction, interfaces and the shape of the build." },
  { n: "03", t: "Build", d: "Engineering, intelligence, integration, testing and disciplined delivery." },
  { n: "04", t: "Evolve", d: "Measurement, iteration, scale and the next capability after launch." },
];

/** Section 9 — four stages morphing into each other as the page scrolls. */
export function Process() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const idx = clamp(p * 1.25 - 0.1) * (STAGES.length - 1);

  return (
    <section ref={ref} id="process" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="wrap">
          <p className="eyebrow">How We Build</p>

          <div className="relative mt-10 h-[46vh] min-h-[280px]">
            {STAGES.map((s, i) => {
              const d = i - idx;
              const near = Math.abs(d);
              const visible = near < 1.2;
              return (
                <div
                  key={s.n}
                  className="absolute inset-x-0 top-0"
                  style={{
                    opacity: visible ? Math.max(0, 1 - near * 1.1) : 0,
                    transform: `translate3d(${d * 14}%, ${d * 40}px, 0) scale(${1 - near * 0.12})`,
                    filter: `blur(${Math.min(8, near * 7)}px)`,
                    pointerEvents: near < 0.5 ? "auto" : "none",
                    transition: "opacity 150ms linear",
                  }}
                >
                  <span
                    className="block font-[family-name:var(--font-display)] text-[clamp(4rem,16vw,12rem)] leading-none font-semibold tabular-nums"
                    style={{ color: "color-mix(in oklab, var(--gold) 85%, transparent)" }}
                  >
                    {s.n}
                  </span>
                  <h3 className="display-lg mt-2">{s.t}</h3>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-4">
            {STAGES.map((s, i) => (
              <div key={s.n} className="flex flex-1 flex-col gap-2">
                <span className="h-px w-full overflow-hidden bg-border">
                  <span
                    className="block h-px origin-left"
                    style={{ background: "var(--gold)", transform: `scaleX(${clamp(idx - i + 1)})` }}
                  />
                </span>
                <span
                  className="text-[9px] tracking-[0.24em] uppercase transition-colors duration-300 sm:text-[10px]"
                  style={{ color: Math.abs(i - idx) < 0.5 ? "var(--gold)" : "var(--color-muted-foreground)" }}
                >
                  {s.t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
