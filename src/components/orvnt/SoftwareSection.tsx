import { usePointer, useSectionProgress } from "@/lib/orvnt";
import { CapabilityGrid, SectionHead, useSectionReveal, type Capability } from "./Capabilities";

const CAPS: Capability[] = [
  { title: "Software", body: "Custom software engineering, applications, APIs, backend systems and digital infrastructure." },
  { title: "SaaS", body: "Subscription software, multi-tenant platforms, workflow products and scalable cloud applications." },
  { title: "Cloud", body: "Cloud-native architecture, deployment, integrations, infrastructure and modernization." },
  { title: "IT Solutions", body: "Technology solutions built around operational requirements, integrations and workflows." },
  { title: "Platforms", body: "Reusable platforms connecting data, services, users and intelligent capabilities." },
  { title: "Product Development", body: "Product discovery, architecture, engineering, testing, launch and iteration." },
];

/** Floating layered planes — a digital architecture, not a hero image. */
function ArchitectureStage() {
  const [ref, ptr] = usePointer<HTMLDivElement>();
  const [progRef, p] = useSectionProgress<HTMLDivElement>();
  const layers = [0, 1, 2, 3];

  return (
    <div ref={progRef} className="reveal">
      <div
        ref={ref}
        className="relative mx-auto h-[46vh] w-full max-w-[820px] min-h-[300px]"
        style={{ perspective: "1100px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${62 + ptr.y * -8}deg) rotateZ(${-32 + ptr.x * 8 + p * 18}deg)`,
            transition: "transform 400ms cubic-bezier(.16,.84,.44,1)",
          }}
        >
          {layers.map((i) => (
            <div
              key={i}
              className="absolute inset-x-[12%] top-[22%] h-[56%] grid-field border"
              style={{
                borderColor: i === 1 ? "color-mix(in oklab, var(--gold) 50%, transparent)" : "var(--color-border-strong)",
                transform: `translateZ(${(i - 1.5) * (58 + p * 46)}px) scale(${1 - i * 0.045})`,
                background: "color-mix(in oklab, var(--color-card) 40%, transparent)",
                opacity: 0.35 + i * 0.16,
              }}
            >
              {i === 1 &&
                [
                  [22, 30],
                  [58, 22],
                  [78, 62],
                  [38, 72],
                ].map(([x, y]) => (
                  <span
                    key={`${x}-${y}`}
                    className="absolute h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ left: `${x}%`, top: `${y}%`, background: "var(--gold)" }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SoftwareSection() {
  const ref = useSectionReveal();
  return (
    <section ref={ref} id="software" className="relative overflow-hidden py-[14vh]">
      <div className="wrap">
        <SectionHead eyebrow="02 / Software & Technology" title="The technical foundation." />
        <div className="mt-[10vh]">
          <ArchitectureStage />
        </div>
        <CapabilityGrid items={CAPS} />
      </div>
    </section>
  );
}
