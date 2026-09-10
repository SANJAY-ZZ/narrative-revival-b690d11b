import { useReveal, usePointer, useSectionProgress } from "@/lib/orvnt";
import { Ring } from "./Ring";

const DOMAINS = [
  { label: "Software", angle: -90 },
  { label: "Artificial Intelligence", angle: -18 },
  { label: "Enterprise", angle: 54 },
  { label: "Digital", angle: 126 },
  { label: "Future Ventures", angle: 198 },
];

/** Section 3 — the ORVNT core with five orbiting domains. */
export function AboutCore() {
  const revealRef = useReveal<HTMLElement>();
  const [stageRef, ptr] = usePointer<HTMLDivElement>();
  const [progRef, p] = useSectionProgress<HTMLDivElement>();

  const spin = p * 90;

  return (
    <section ref={revealRef} id="about" className="relative overflow-hidden py-[16vh]">
      <div className="wrap">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">01 / About ORVNT</p>
          <h2 className="display-lg mt-6">Building technology across today and tomorrow.</h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            ORVNT builds useful software and intelligent systems, helps organizations modernize, creates digital
            products, and explores new opportunities through technology and innovation.
          </p>
        </div>

        <div ref={progRef} className="mt-[12vh]">
          <div
            ref={stageRef}
            className="reveal relative mx-auto aspect-square w-full max-w-[680px]"
            style={{ perspective: "1200px" }}
          >
            {/* mouse-reactive light */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full transition-transform duration-500 ease-out"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(205,170,125,0.18) 0%, transparent 58%)",
                transform: `translate3d(${ptr.x * 34}px, ${ptr.y * 34}px, 0)`,
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                transform: `rotateX(${58 + ptr.y * -6}deg) rotateZ(${spin + ptr.x * 6}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 300ms cubic-bezier(.16,.84,.44,1)",
              }}
            >
              {[0.42, 0.68, 0.94].map((r, i) => (
                <div
                  key={r}
                  className="absolute rounded-full border"
                  style={{
                    inset: `${(1 - r) * 50}%`,
                    borderColor: i === 1 ? "color-mix(in oklab, var(--gold) 45%, transparent)" : "var(--color-border-strong)",
                  }}
                />
              ))}
            </div>

            {/* core ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate3d(calc(-50% + ${ptr.x * 12}px), calc(-50% + ${ptr.y * 12}px), 0)`,
                transition: "transform 400ms cubic-bezier(.16,.84,.44,1)",
              }}
            >
              <Ring size={110} className="[animation:orvnt-breathe_40s_linear_infinite]" />
            </div>

            {/* orbiting domains */}
            {DOMAINS.map((d, i) => {
              const a = ((d.angle + spin * 0.55) * Math.PI) / 180;
              const rx = 44;
              const ry = 25;
              const x = 50 + Math.cos(a) * rx;
              const y = 50 + Math.sin(a) * ry;
              const depth = (Math.sin(a) + 1) / 2;
              return (
                <div
                  key={d.label}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    opacity: 0.45 + depth * 0.55,
                    zIndex: Math.round(depth * 10),
                    transform: `translate(-50%,-50%) scale(${0.86 + depth * 0.22}) translate3d(${ptr.x * (6 + i * 3)}px, ${ptr.y * (6 + i * 3)}px, 0)`,
                    transition: "transform 500ms cubic-bezier(.16,.84,.44,1)",
                  }}
                >
                  <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="font-[family-name:var(--font-display)] text-[10px] font-medium tracking-[0.2em] uppercase sm:text-[11.5px]">
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
