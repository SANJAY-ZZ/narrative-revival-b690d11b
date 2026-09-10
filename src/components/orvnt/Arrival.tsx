import { useEffect, useState } from "react";
import { RingOnVoid } from "./Ring";
import { clamp } from "@/lib/orvnt";

/**
 * Section 1 — full-screen black arrival. The ring breathes, the wordmark
 * settles, then the whole stage lifts and dissolves on the first scroll.
 */
export function Arrival() {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setT(clamp(window.scrollY / Math.max(1, window.innerHeight * 0.9)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
    };
  }, []);

  return (
    <section id="arrival" className="relative h-[190vh]">
      <div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        style={{ background: "var(--ink)" }}
      >
        {/* faint field */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,245,247,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,245,247,0.045) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
            maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 72%)",
            transform: `scale(${1 + t * 0.35})`,
          }}
        />

        <div
          className="relative flex flex-col items-center"
          style={{
            transform: `translate3d(0, ${-t * 90}px, 0) scale(${1 - t * 0.14})`,
            opacity: 1 - clamp(t * 1.5),
          }}
        >
          {/* gold halo */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-[62%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(205,170,125,0.30) 0%, transparent 62%)",
              filter: "blur(22px)",
              animation: "orvnt-glow 7s var(--ease) infinite",
            }}
          />

          <div className="[animation:orvnt-breathe_28s_linear_infinite]">
            <div className="[animation:orvnt-fade-up_1.6s_var(--ease)_.15s_both]">
              <RingOnVoid size={132} className="opacity-95" />
            </div>
          </div>


          <h1
            className="mt-12 font-[family-name:var(--font-display)] text-[clamp(2.4rem,9vw,5.5rem)] leading-none font-semibold tracking-[0.3em] [animation:orvnt-fade-up_1.4s_var(--ease)_.6s_both]"
            style={{ color: "var(--paper)", marginRight: "-0.3em" }}
          >
            ORVNT
          </h1>

          <p
            className="mt-8 text-[10px] tracking-[0.5em] uppercase [animation:orvnt-fade-up_1.4s_var(--ease)_1.05s_both] sm:text-[11px]"
            style={{ color: "var(--gold)" }}
          >
            Build · Intelligence · Impact
          </p>
        </div>

        <div
          className="absolute bottom-10 flex flex-col items-center gap-3 [animation:orvnt-fade-up_1.4s_var(--ease)_1.6s_both]"
          style={{ opacity: 1 - clamp(t * 2.6) }}
        >
          <span className="text-[9px] tracking-[0.38em] uppercase" style={{ color: "rgba(245,245,247,0.42)" }}>
            Scroll
          </span>
          <span
            className="h-10 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(205,170,125,0.8), transparent)" }}
          />
        </div>
      </div>
    </section>
  );
}
