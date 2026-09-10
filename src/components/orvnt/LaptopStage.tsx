import { clamp, phase, useSectionProgress } from "@/lib/orvnt";
import { RingOnVoid } from "./Ring";
import { SplineLaptop } from "./SplineLaptop";

/**
 * Opening sequence, part three. The camera pulls back from the wordmark, the
 * laptop appears, the ORVNT site scrolls inside it, the lid closes and the
 * stage dissolves into the real website. Entirely scroll-linked, so the user
 * can stop, reverse and scrub in either direction.
 */
export function LaptopStage() {
  const [ref, p] = useSectionProgress<HTMLElement>();

  const appear = phase(p, 0.08, 0.3); // laptop arrives
  const zoom = phase(p, 0.12, 0.52); // camera pulls back
  const scroll = phase(p, 0.42, 0.72); // content scrolls inside the screen
  const close = phase(p, 0.74, 0.9); // lid closes
  const exit = phase(p, 0.88, 1); // stage dissolves

  const scale = 0.62 + appear * 0.42 - zoom * 0.06;

  return (
    <section ref={ref} className="relative h-[300vh]" style={{ background: "var(--ink)" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 45%, rgba(205,170,125,0.10) 0%, transparent 60%)",
            opacity: 0.4 + appear * 0.6,
          }}
        />

        <div
          className="w-full"
          style={{
            opacity: appear * (1 - exit),
            transform: `translate3d(0, ${(1 - appear) * 60 - exit * 40}px, 0)`,
          }}
        >
          <SplineLaptop open={1 - close} scale={scale} tiltX={16 - zoom * 10}>
            {/* the ORVNT site living inside the screen */}
            <div
              className="absolute inset-x-0 top-0 flex flex-col items-center gap-6 px-6 py-8"
              style={{ transform: `translate3d(0, ${-scroll * 46}%, 0)`, transition: "transform 120ms linear" }}
            >
              <RingOnVoid size={34} />
              <p
                className="font-[family-name:var(--font-display)] text-[7px] tracking-[0.5em] uppercase sm:text-[10px]"
                style={{ color: "rgba(245,245,247,0.6)" }}
              >
                Build · Intelligence · Impact
              </p>
              <p
                className="max-w-[70%] text-center font-[family-name:var(--font-display)] text-[13px] leading-tight font-semibold sm:text-[22px]"
                style={{ color: "var(--paper)" }}
              >
                Building technology across today and tomorrow.
              </p>
              <div className="mt-2 grid w-full max-w-[80%] grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-8 border sm:h-14"
                    style={{
                      borderColor: i === 1 ? "rgba(205,170,125,0.5)" : "rgba(245,245,247,0.14)",
                      background: "rgba(245,245,247,0.03)",
                    }}
                  />
                ))}
              </div>
              <div className="flex w-full max-w-[80%] flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-[5px]"
                    style={{ width: `${88 - i * 11}%`, background: "rgba(245,245,247,0.14)" }}
                  />
                ))}
              </div>
            </div>
          </SplineLaptop>
        </div>

        <p
          className="absolute bottom-[9vh] text-[9px] tracking-[0.4em] uppercase"
          style={{ color: "rgba(245,245,247,0.4)", opacity: clamp(appear - close) }}
        >
          Keep scrolling
        </p>
      </div>
    </section>
  );
}
