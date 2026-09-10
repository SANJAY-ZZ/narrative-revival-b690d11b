import { useReveal, usePointer } from "@/lib/orvnt";

export type Capability = { title: string; body: string };

/** Perspective card that tilts toward the cursor. */
export function TiltCard({ index, cap }: { index: number; cap: Capability }) {
  const [ref, ptr] = usePointer<HTMLDivElement>();
  return (
    <div style={{ perspective: "900px" }} className="reveal">
      <div
        ref={ref}
        className="group relative h-full border p-7 transition-colors duration-500 hover:border-gold sm:p-8"
        style={{
          borderColor: "var(--color-border)",
          background: "color-mix(in oklab, var(--color-card) 55%, transparent)",
          transform: `rotateX(${ptr.y * -4}deg) rotateY(${ptr.x * 5}deg) translateZ(0)`,
          transformStyle: "preserve-3d",
          transition: "transform 320ms cubic-bezier(.16,.84,.44,1), border-color .5s",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${50 + ptr.x * 50}% ${50 + ptr.y * 50}%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 60%)`,
          }}
        />
        <span className="relative text-[10px] tracking-[0.28em] text-muted-foreground tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight sm:text-2xl">
          {cap.title}
        </h3>
        <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{cap.body}</p>
        <span
          className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
          style={{ background: "var(--gold)" }}
        />
      </div>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  onVoid = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  onVoid?: boolean;
}) {
  return (
    <div className="reveal max-w-3xl">
      <p className="eyebrow" style={onVoid ? { color: "rgba(245,245,247,0.5)" } : undefined}>
        {eyebrow}
      </p>
      <h2 className="display-lg mt-6" style={onVoid ? { color: "var(--paper)" } : undefined}>
        {title}
      </h2>
      {lede && (
        <p
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground"
          style={onVoid ? { color: "rgba(245,245,247,0.62)" } : undefined}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function CapabilityGrid({ items }: { items: Capability[] }) {
  return (
    <div
      className="mt-[9vh] grid border-t border-l sm:grid-cols-2 lg:grid-cols-3"
      style={{ borderColor: "var(--color-border)" }}
    >
      {items.map((c, i) => (
        <div key={c.title} className="border-r border-b" style={{ borderColor: "var(--color-border)" }}>
          <TiltCard index={i} cap={c} />
        </div>
      ))}
    </div>
  );
}


export function useSectionReveal() {
  return useReveal<HTMLElement>();
}
