import { useEffect, useState } from "react";

const STOPS = [
  { id: "arrival", label: "Arrival" },
  { id: "name", label: "The Name" },
  { id: "about", label: "About" },
  { id: "software", label: "Software" },
  { id: "ai", label: "Intelligence" },
  { id: "enterprise", label: "Enterprise" },
  { id: "digital", label: "Digital" },
  { id: "ventures", label: "Ventures" },
  { id: "process", label: "How We Build" },
  { id: "contact", label: "Contact" },
];

export function ScrollRail({ visible }: { visible: boolean }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = STOPS.findIndex((s) => s.id === e.target.id);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    STOPS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <aside
      aria-hidden
      className="fixed top-1/2 right-8 z-40 hidden -translate-y-1/2 transition-opacity duration-700 xl:block"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="relative flex flex-col items-end gap-6">
        <div className="absolute top-0 right-[3.5px] h-full w-px bg-border" />
        <div
          className="absolute top-0 right-[3px] w-[3px] origin-top bg-gold transition-transform duration-200 ease-out"
          style={{ height: "100%", transform: `scaleY(${progress})` }}
        />
        {STOPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="group relative flex items-center gap-3 pr-0"
          >
            <span
              className="pointer-events-none text-[10px] uppercase tracking-[0.24em] whitespace-nowrap opacity-0 transition-all duration-400 group-hover:opacity-100"
              style={i === active ? { opacity: 1, color: "var(--gold)" } : { color: "var(--color-muted-foreground)" }}
            >
              {s.label}
            </span>
            <span
              className="relative z-10 h-[7px] w-[7px] rounded-full border transition-all duration-400"
              style={{
                borderColor: i <= active ? "var(--gold)" : "var(--color-border-strong)",
                background: i === active ? "var(--gold)" : "var(--color-background)",
                transform: i === active ? "scale(1.3)" : "none",
              }}
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
