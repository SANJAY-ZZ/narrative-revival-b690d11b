import { useSectionProgress, phase } from "@/lib/orvnt";
import { RingOnVoid } from "./Ring";

const LINES = ["Intelligence, orchestrated.", "Systems, evolved.", "Impact, inevitable."];

/** Section 10 — near-pure black; the statement lands one line at a time. */
export function FinalStatement() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const ringOn = phase(p, 0.05, 0.22);

  return (
    <section ref={ref} className="relative h-[300vh]" style={{ background: "#030304" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 45%, rgba(205,170,125,0.08) 0%, transparent 55%)" }}
        />

        <div
          className="absolute"
          style={{
            opacity: ringOn * (1 - phase(p, 0.82, 1) * 0.4),
            transform: `scale(${0.85 + ringOn * 0.3}) rotate(${p * 90}deg)`,
            filter: "drop-shadow(0 0 40px rgba(205,170,125,0.25))",
          }}
        >
          <RingOnVoid size={280} className="opacity-[0.16]" />
        </div>

        <div className="wrap relative flex flex-col items-center gap-8 text-center sm:gap-12">
          {LINES.map((line, i) => {
            const start = 0.26 + i * 0.19;
            const t = phase(p, start, start + 0.14);
            return (
              <h2
                key={line}
                className="font-[family-name:var(--font-display)] leading-[0.95] font-medium"
                style={{
                  fontSize: "clamp(1.9rem, 6.4vw, 5rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--paper)",
                  opacity: t,
                  transform: `translate3d(0, ${(1 - t) * 40}px, 0)`,
                }}
              >
                {line.split(", ")[0]},{" "}
                <span style={{ color: "var(--gold)" }}>{line.split(", ")[1]}</span>
              </h2>
            );
          })}
        </div>
      </div>
    </section>
  );
}
