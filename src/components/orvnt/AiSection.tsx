import { useEffect, useRef } from "react";
import { useSectionProgress, prefersReducedMotion } from "@/lib/orvnt";
import { CapabilityGrid, SectionHead, useSectionReveal, type Capability } from "./Capabilities";

const CAPS: Capability[] = [
  { title: "Generative AI", body: "LLM applications, RAG, context engineering, copilots and domain-specific AI." },
  { title: "AI Agents", body: "Goal-oriented agents, tool use, orchestration, workflows and decision-support systems." },
  { title: "Machine Learning", body: "Predictive models, classification, recommendation, analytics and production ML." },
  { title: "Automation", body: "Intelligent workflow automation that reduces repetitive work and improves efficiency." },
  { title: "AI Products", body: "AI-first products designed around user needs, measurable outcomes and scalable deployment." },
  { title: "Applied Research", body: "Research and experimentation translating emerging AI capabilities into practical solutions." },
];

type Node = { x: number; y: number; z: number; vx: number; vy: number };

/** Canvas neural lattice — champagne gold on ink, cursor-reactive, scroll-driven. */
function NeuralField({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progRef = useRef(progress);
  progRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const mid = window.matchMedia("(min-width: 640px)").matches;
    const COUNT = reduced ? 30 : wide ? 120 : mid ? 64 : 36;
    const LINK = wide ? 210 : 140;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.35 + Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
      });
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    let running = true;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!running) return;
      const p = progRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx * (0.5 + p);
          n.y += n.vy * (0.5 + p);
        }
        if (n.x < 0) n.x += w;
        if (n.x > w) n.x -= w;
        if (n.y < 0) n.y += h;
        if (n.y > h) n.y -= h;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 150) {
          n.x += (dx / (d || 1)) * (150 - d) * 0.012;
          n.y += (dy / (d || 1)) * (150 - d) * 0.012;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK) continue;
          const alpha = (1 - d / LINK) * (0.14 + p * 0.34) * a.z * b.z;
          ctx.strokeStyle = `rgba(205,170,125,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 150;
        ctx.beginPath();
        ctx.arc(n.x, n.y, (near ? 2.4 : 1.5) * n.z, 0, Math.PI * 2);
        ctx.fillStyle = near
          ? "rgba(205,170,125,0.95)"
          : `rgba(245,245,247,${(0.22 + n.z * 0.38).toFixed(3)})`;
        ctx.fill();
      }
      if (reduced) running = false;
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([e]) => (running = !!e?.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export function AiSection() {
  const ref = useSectionReveal();
  const [progRef, p] = useSectionProgress<HTMLDivElement>();

  return (
    <section ref={ref} id="ai" className="relative overflow-hidden" style={{ background: "var(--ink)" }}>
      <div ref={progRef} className="relative py-[14vh]">
        <div className="absolute inset-0">
          <NeuralField progress={p} />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(205,170,125,0.10) 0%, transparent 60%)",
          }}
        />
        <div className="wrap relative">
          <SectionHead
            eyebrow="03 / Artificial Intelligence"
            title="Intelligence engineered for real-world use."
            onVoid
          />
          <div className="mt-[34vh]" />
          <div
            className="grid gap-px sm:grid-cols-2 lg:grid-cols-3"
            style={{ background: "rgba(245,245,247,0.12)" }}
          >
            {CAPS.map((c, i) => (
              <div
                key={c.title}
                className="reveal group relative p-7 transition-colors duration-500 sm:p-8"
                style={{ background: "color-mix(in oklab, #121214 88%, transparent)" }}
              >
                <span className="text-[10px] tracking-[0.28em] tabular-nums" style={{ color: "rgba(245,245,247,0.4)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-5 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight sm:text-2xl"
                  style={{ color: "var(--paper)" }}
                >
                  {c.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(245,245,247,0.58)" }}>
                  {c.body}
                </p>
                <span
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{ background: "var(--gold)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { CapabilityGrid };
