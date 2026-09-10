import { usePointer, useSectionProgress } from "@/lib/orvnt";
import { CapabilityGrid, SectionHead, useSectionReveal, type Capability } from "./Capabilities";

const CAPS: Capability[] = [
  { title: "Digital Marketing", body: "Digital campaigns, growth systems, content, performance marketing and technology-enabled marketing." },
  { title: "Web & Mobile", body: "Modern websites, web applications, mobile experiences and connected digital journeys." },
  { title: "Digital Products", body: "Customer-facing digital products designed for usability, growth and long-term evolution." },
  { title: "Creative / Brand Services", body: "Brand identity, visual systems, digital creative and technology-aligned brand experiences." },
];

/** Floating UI surfaces in perspective — an interface ecosystem, not stock art. */
function InterfaceEcosystem() {
  const [ref, ptr] = usePointer<HTMLDivElement>();
  const [progRef, p] = useSectionProgress<HTMLDivElement>();

  const panels = [
    { x: 4, y: 14, w: 40, h: 54, z: 0, rows: 5 },
    { x: 32, y: 30, w: 36, h: 50, z: 90, rows: 4 },
    { x: 60, y: 8, w: 30, h: 44, z: 46, rows: 3 },
    { x: 68, y: 56, w: 26, h: 34, z: 130, rows: 2 },
  ];

  return (
    <div ref={progRef} className="reveal">
      <div ref={ref} className="relative mx-auto h-[54vh] min-h-[340px] w-full max-w-[900px]" style={{ perspective: "1300px" }}>
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${12 + ptr.y * -5}deg) rotateY(${-14 + ptr.x * 10}deg)`,
            transition: "transform 420ms cubic-bezier(.16,.84,.44,1)",
          }}
        >
          {panels.map((pn, i) => (
            <div
              key={i}
              className="absolute border p-4"
              style={{
                left: `${pn.x}%`,
                top: `${pn.y}%`,
                width: `${pn.w}%`,
                height: `${pn.h}%`,
                borderColor: i === 1 ? "color-mix(in oklab, var(--gold) 55%, transparent)" : "var(--color-border-strong)",
                background: "color-mix(in oklab, var(--color-card) 70%, transparent)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                transform: `translateZ(${pn.z + p * 40}px) translateY(${(1 - p) * i * 18}px)`,
                boxShadow: "0 40px 80px -40px rgba(0,0,0,0.6)",
                transition: "transform 300ms linear",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                <span className="h-px w-8 bg-border-strong" />
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {Array.from({ length: pn.rows }).map((_, r) => (
                  <span
                    key={r}
                    className="h-[6px]"
                    style={{
                      width: `${90 - r * 13}%`,
                      background: "var(--color-border-strong)",
                      opacity: 1 - r * 0.13,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DigitalSection() {
  const ref = useSectionReveal();
  return (
    <section ref={ref} id="digital" className="relative overflow-hidden py-[14vh]">
      <div className="wrap">
        <SectionHead eyebrow="05 / Digital" title="Designing connected digital experiences." />
        <div className="mt-[10vh]">
          <InterfaceEcosystem />
        </div>
        <CapabilityGrid items={CAPS} />
      </div>
    </section>
  );
}
