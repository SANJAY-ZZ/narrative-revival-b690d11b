import { usePointer, useSectionProgress } from "@/lib/orvnt";
import { CapabilityGrid, SectionHead, useSectionReveal, type Capability } from "./Capabilities";

const CAPS: Capability[] = [
  { title: "ERP", body: "Enterprise resource planning solutions and integrations connecting finance, operations, people and data." },
  { title: "CRM", body: "Customer relationship systems, sales workflows, service operations and customer intelligence." },
  { title: "Business Systems", body: "Connected systems for workflows, reporting, collaboration, operations and decision-making." },
  { title: "Digital Transformation", body: "Modernization combining technology, process redesign, automation and data." },
  { title: "Enterprise Consulting", body: "Technology strategy, architecture, product direction and implementation guidance." },
];

const MODULES = [
  { x: 12, y: 18, w: 24, h: 20, label: "Finance" },
  { x: 45, y: 8, w: 22, h: 18, label: "Operations" },
  { x: 74, y: 26, w: 20, h: 22, label: "People" },
  { x: 20, y: 56, w: 26, h: 22, label: "Data" },
  { x: 58, y: 58, w: 24, h: 20, label: "Customers" },
];

/** Interconnected operating architecture — 3D blocks joined by hairlines. */
function OperatingArchitecture() {
  const [ref, ptr] = usePointer<HTMLDivElement>();
  const [progRef, p] = useSectionProgress<HTMLDivElement>();

  const links: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [1, 4],
    [2, 4],
  ];
  const centre = (i: number) => {
    const m = MODULES[i]!;
    return { cx: m.x + m.w / 2, cy: m.y + m.h / 2 };
  };

  return (
    <div ref={progRef} className="reveal overflow-hidden py-6">
      <div ref={ref} className="relative mx-auto h-[52vh] min-h-[340px] w-full max-w-[900px]" style={{ perspective: "1200px" }}>

        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${18 + ptr.y * -6}deg) rotateY(${ptr.x * 9}deg) translateZ(${p * 30}px)`,
            transition: "transform 400ms cubic-bezier(.16,.84,.44,1)",
          }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {links.map(([a, b], i) => {
              const A = centre(a);
              const B = centre(b);
              return (
                <line
                  key={i}
                  x1={A.cx}
                  y1={A.cy}
                  x2={B.cx}
                  y2={B.cy}
                  stroke="var(--gold)"
                  strokeWidth={0.18}
                  strokeDasharray="1.6 1.6"
                  opacity={0.25 + p * 0.55}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {MODULES.map((m, i) => (
            <div
              key={m.label}
              className="absolute border backdrop-blur-[2px]"
              style={{
                left: `${m.x}%`,
                top: `${m.y}%`,
                width: `${m.w}%`,
                height: `${m.h}%`,
                borderColor: "var(--color-border-strong)",
                background: "color-mix(in oklab, var(--color-card) 62%, transparent)",
                transform: `translateZ(${(i % 3) * 34 + p * 26}px)`,
                boxShadow: "0 24px 60px -30px rgba(0,0,0,0.55)",
              }}
            >
              <span className="absolute top-3 left-3 text-[9px] tracking-[0.24em] text-muted-foreground uppercase sm:text-[10px]">
                {m.label}
              </span>
              <span className="absolute right-3 bottom-3 h-[5px] w-[5px] rounded-full" style={{ background: "var(--gold)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EnterpriseSection() {
  const ref = useSectionReveal();
  return (
    <section ref={ref} id="enterprise" className="relative overflow-hidden py-[14vh]">
      <div className="wrap">
        <SectionHead eyebrow="04 / Enterprise" title="Modernizing how organizations operate." />
        <div className="mt-[10vh]">
          <OperatingArchitecture />
        </div>
        <CapabilityGrid items={CAPS} />
      </div>
    </section>
  );
}
