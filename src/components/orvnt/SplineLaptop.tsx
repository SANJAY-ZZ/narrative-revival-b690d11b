import type { ReactNode } from "react";

/**
 * SPLINE LAPTOP WILL BE INSERTED HERE
 *
 * Reusable placeholder for the forthcoming Spline 3D laptop scene.
 * The rest of the opening sequence only depends on this component's props and
 * its box, so the internals can be swapped for a <Spline scene="..." /> mount
 * without touching the page structure.
 *
 * Props:
 *   open      0..1  lid angle — 0 = fully closed, 1 = fully open
 *   scale     visual scale multiplier driven by the scroll "camera"
 *   tiltX/Y   degrees of camera tilt (pointer or scroll driven)
 *   children  what renders on the screen (the ORVNT site preview)
 */
export function SplineLaptop({
  open = 1,
  scale = 1,
  tiltX = 8,
  tiltY = 0,
  children,
}: {
  open?: number;
  scale?: number;
  tiltX?: number;
  tiltY?: number;
  children?: ReactNode;
}) {
  const lidAngle = -90 + open * 90; // closed (-90deg) → open (0deg)

  return (
    <div
      className="relative mx-auto w-[min(88vw,900px)] select-none"
      style={{ perspective: "1800px", transform: `scale(${scale})`, transformOrigin: "50% 60%" }}
      aria-hidden
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: "transform 400ms cubic-bezier(.16,.84,.44,1)",
        }}
      >
        {/* lid + screen */}
        <div
          className="relative aspect-[16/10] w-full origin-bottom border"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${lidAngle}deg)`,
            borderColor: "color-mix(in oklab, var(--paper) 16%, transparent)",
            background: "linear-gradient(160deg, #1c1d21 0%, #101114 60%, #17181c 100%)",
            borderRadius: "10px",
            boxShadow: "0 60px 120px -60px rgba(0,0,0,0.85)",
          }}
        >
          {/* thin bezel + screen */}
          <div
            className="absolute inset-[10px] overflow-hidden"
            style={{ borderRadius: "4px", background: "var(--ink)" }}
          >
            {children}
            {/* subtle screen reflection */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(118deg, rgba(245,245,247,0.10) 0%, rgba(245,245,247,0.02) 26%, transparent 46%)",
              }}
            />
          </div>
          <span
            className="absolute inset-x-0 bottom-[3px] mx-auto block h-[3px] w-[52px] rounded-full"
            style={{ background: "color-mix(in oklab, var(--paper) 14%, transparent)" }}
          />
        </div>

        {/* base / deck */}
        <div
          className="relative h-[14px] w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(78deg) translateZ(-6px)",
            background: "linear-gradient(180deg, #26272c 0%, #15161a 100%)",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 40px 70px -30px rgba(0,0,0,0.9)",
          }}
        >
          <span
            className="absolute top-[4px] left-1/2 h-[5px] w-[110px] -translate-x-1/2 rounded-b-md"
            style={{ background: "rgba(0,0,0,0.45)" }}
          />
        </div>

        {/* contact shadow */}
        <div
          className="pointer-events-none mx-auto h-[60px] w-[80%] -translate-y-3 blur-2xl"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.65), transparent 70%)" }}
        />
      </div>
    </div>
  );
}
