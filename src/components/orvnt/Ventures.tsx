import { useSectionProgress, clamp, phase } from "@/lib/orvnt";
import { RingOnVoid } from "./Ring";

const POINTS = [
  { label: "New Industries", a: -78 },
  { label: "Strategic Investments", a: -6 },
  { label: "Joint Ventures", a: 66 },
  { label: "Acquisitions", a: 138 },
  { label: "New Business Creation", a: 210 },
];

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [0, 2],
  [1, 3],
];

/** Section 8 — darker, emptier. Distant points connect into new structure. */
export function Ventures() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const emerge = phase(p, 0.15, 0.45);
  const connect = phase(p, 0.42, 0.78);

  const pos = (a: number) => {
    const r = (a * Math.PI) / 180;
    const round = (n: number) => Math.round(n * 1000) / 1000;
    return {
      x: round(50 + Math.cos(r) * (26 + emerge * 12)),
      y: round(50 + Math.sin(r) * (26 + emerge * 12)),
    };

  };

  return (
    <section ref={ref} id="ventures" className="relative h-[260vh]" style={{ background: "#050506" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(205,170,125,0.09) 0%, transparent 58%)",
            opacity: 0.4 + emerge * 0.6,
          }}
        />

        <div className="relative aspect-square w-[min(92vw,760px)]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
            {LINKS.map(([a, b], i) => {
              const A = pos(POINTS[a]!.a);
              const B = pos(POINTS[b]!.a);
              const local = clamp((connect - i * 0.08) * 3);
              return (
                <line
                  key={i}
                  x1={A.x}
                  y1={A.y}
                  x2={A.x + (B.x - A.x) * local}
                  y2={A.y + (B.y - A.y) * local}
                  stroke="rgba(205,170,125,0.5)"
                  strokeWidth={0.15}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              style={{
                transform: `scale(${0.7 + emerge * 0.55}) rotate(${p * 120}deg)`,
                opacity: 0.35 + emerge * 0.65,
                filter: `drop-shadow(0 0 ${18 + connect * 32}px rgba(205,170,125,${0.2 + connect * 0.35}))`,
              }}
            >
              <RingOnVoid size={170} />
            </div>
          </div>

          {POINTS.map((pt, i) => {
            const c = pos(pt.a);
            const local = clamp((emerge - i * 0.07) * 3);
            return (
              <div
                key={pt.label}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
                style={{ left: `${c.x}%`, top: `${c.y}%`, opacity: local }}
              >
                <span
                  className="h-[6px] w-[6px] rounded-full"
                  style={{ background: "var(--gold)", boxShadow: "0 0 12px rgba(205,170,125,0.8)" }}
                />
                <span
                  className="font-[family-name:var(--font-display)] text-[9px] tracking-[0.2em] whitespace-nowrap uppercase sm:text-[11px]"
                  style={{ color: "rgba(245,245,247,0.72)" }}
                >
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="wrap pointer-events-none absolute inset-x-0 top-[13vh]">
          <p className="eyebrow" style={{ color: "rgba(245,245,247,0.45)" }}>
            06 / Future Ventures
          </p>
          <h2 className="display-lg mt-5 max-w-2xl" style={{ color: "var(--paper)" }}>
            Creating what does not exist yet.
          </h2>
        </div>

        <p
          className="wrap absolute inset-x-0 bottom-[9vh] max-w-xl text-sm leading-relaxed transition-opacity duration-700"
          style={{ color: "rgba(245,245,247,0.55)", opacity: clamp((p - 0.5) * 3) }}
        >
          ORVNT explores opportunities beyond today's categories through partnerships, investment, acquisition and the
          creation of entirely new businesses.
        </p>
      </div>
    </section>
  );
}
