import { useSectionProgress, clamp, phase } from "@/lib/orvnt";

const LETTERS = [
  { ch: "O", word: "Orchestrate", sub: "The Core" },
  { ch: "R", word: "Refine", sub: "Intelligence" },
  { ch: "V", word: "Vision", sub: "& Value" },
  { ch: "N", word: "Navigate", sub: "Change" },
  { ch: "T", word: "Transform", sub: "The Future" },
];

/**
 * Section 2 — ORVNT at display scale. Scroll separates the letters, reveals
 * each meaning, then draws them back into the wordmark.
 */
export function Letters() {
  const [ref, p] = useSectionProgress<HTMLElement>();

  // spread ramps up, holds, then collapses back to zero
  const spread = p < 0.55 ? phase(p, 0.12, 0.5) : 1 - phase(p, 0.72, 0.93);
  const s = clamp(spread);
  const meaning = p < 0.6 ? phase(p, 0.3, 0.5) : 1 - phase(p, 0.66, 0.8);

  return (
    <section ref={ref} id="name" className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <p
          className="eyebrow absolute top-[16vh] transition-opacity duration-500"
          style={{ opacity: 1 - clamp(p * 3) + clamp((p - 0.9) * 6) }}
        >
          The Name
        </p>

        <div
          className="flex w-full items-start justify-center"
          style={{ perspective: "1400px" }}
        >
          {LETTERS.map((l, i) => {
            const centre = i - (LETTERS.length - 1) / 2;
            const gap = s * 3.6; // em of extra separation
            return (
              <div
                key={l.ch}
                className="relative flex flex-col items-center"
                style={{
                  transform: `translate3d(${centre * gap}rem, ${Math.sin(i * 1.4) * s * 14}px, ${s * -60}px) rotateY(${centre * s * 5}deg)`,
                  transition: "transform 120ms linear",
                }}
              >
                <span
                  className="font-[family-name:var(--font-display)] leading-[0.82] font-semibold select-none"
                  style={{
                    fontSize: "clamp(3.6rem, 15vw, 13rem)",
                    letterSpacing: "-0.05em",
                    color: s > 0.35 ? "var(--color-foreground)" : "var(--color-foreground)",
                    textShadow: `0 ${s * 26}px ${s * 60}px rgba(0,0,0,${s * 0.35})`,
                  }}
                >
                  {l.ch}
                </span>
                <div
                  className="mt-5 w-[9ch] text-center sm:w-[11ch]"
                  style={{
                    opacity: meaning,
                    transform: `translate3d(0, ${(1 - meaning) * 16}px, 0)`,
                  }}
                >
                  <span
                    className="block h-6 w-px"
                    style={{ background: "var(--gold)", margin: "0 auto 14px", transform: `scaleY(${meaning})` }}
                  />
                  <span
                    className="block font-[family-name:var(--font-display)] text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[12px]"
                    style={{ color: "var(--gold)" }}
                  >
                    {l.word}
                  </span>
                  <span className="mt-1 block text-[9px] tracking-[0.18em] text-muted-foreground uppercase sm:text-[10px]">
                    {l.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="absolute bottom-[14vh] max-w-md px-6 text-center text-sm text-muted-foreground"
          style={{ opacity: clamp((p - 0.86) * 7) }}
        >
          Five movements. One system.
        </p>
      </div>
    </section>
  );
}
