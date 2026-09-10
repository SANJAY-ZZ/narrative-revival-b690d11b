import { useEffect, useRef, useState } from "react";

export const RING_ALT = "ORVNT ring mark";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Adds `is-visible` once the element enters the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    el.querySelectorAll<HTMLElement>(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/**
 * Progress 0..1 of an element travelling through the viewport.
 * 0 = element top hits the bottom of the viewport, 1 = element bottom leaves the top.
 */
export function useSectionProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let active = true;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = r.height + vh;
      const travelled = vh - r.top;
      setP(Math.min(1, Math.max(0, travelled / total)));
    };
    const onScroll = () => {
      if (!active || raf) return;
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return [ref, p] as const;
}

/** Normalised pointer position (-1..1) relative to the element centre. */
export function usePointer<T extends HTMLElement = HTMLDivElement>(enabled = true) {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    let next = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      next = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      };
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), setPos(next)));
    };
    const onLeave = () => setPos({ x: 0, y: 0 });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);
  return [ref, pos] as const;
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setY(window.scrollY);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
    };
  }, []);
  return y;
}

export function clamp(v: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, v));
}

/** Map t (0..1) into a sub-window [from,to] of that range, re-normalised 0..1. */
export function phase(t: number, from: number, to: number) {
  return clamp((t - from) / (to - from));
}
