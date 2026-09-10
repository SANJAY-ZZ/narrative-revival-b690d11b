import { useEffect, useState } from "react";
import { Ring } from "./Ring";

const LINKS = [
  { id: "about", label: "About" },
  { id: "software", label: "Software" },
  { id: "ai", label: "AI" },
  { id: "enterprise", label: "Enterprise" },
  { id: "digital", label: "Digital" },
  { id: "ventures", label: "Ventures" },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("orvnt-theme", next);
    } catch {
      /* storage unavailable */
    }
  };
  return { theme, toggle };
}

export function Nav({ visible }: { visible: boolean }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "none" : "translate3d(0,-14px,0)",
        borderColor: scrolled ? "var(--color-border)" : "transparent",
        background: scrolled ? "var(--header-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        padding: scrolled ? "14px 0" : "24px 0",
      }}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
          aria-label="ORVNT home"
        >
          <Ring size={24} />
          <span className="font-[family-name:var(--font-display)] text-[14px] font-semibold tracking-[0.38em]">
            ORVNT
          </span>
        </button>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="group relative py-1 text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              style={active === l.id ? { color: "var(--color-foreground)" } : undefined}
            >
              {l.label}
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-400 group-hover:scale-x-100"
                style={active === l.id ? { transform: "scaleX(1)" } : undefined}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative h-7 w-[52px] rounded-full border border-border-strong bg-secondary transition-colors"
          >
            <span
              className="absolute top-[2px] left-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-full text-ink transition-transform duration-500"
              style={{
                background: "var(--gold)",
                transform: theme === "dark" ? "translateX(24px)" : "none",
              }}
            >
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>

          <button
            onClick={() => go("contact")}
            className="hidden border border-border-strong px-5 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-gold hover:text-gold sm:block"
          >
            Let's Build
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-7 w-7 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className="h-px w-5 bg-foreground transition-transform duration-400"
              style={open ? { transform: "translateY(3px) rotate(45deg)" } : undefined}
            />
            <span
              className="h-px w-5 bg-foreground transition-transform duration-400"
              style={open ? { transform: "translateY(-3px) rotate(-45deg)" } : undefined}
            />
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      <div
        className="overflow-hidden border-t transition-[max-height,opacity] duration-500 lg:hidden"
        style={{
          maxHeight: open ? 460 : 0,
          opacity: open ? 1 : 0,
          borderColor: open ? "var(--color-border)" : "transparent",
          background: "var(--color-background)",
        }}
      >
        <div className="wrap flex flex-col py-4">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="border-b border-border py-4 text-left font-[family-name:var(--font-display)] text-lg tracking-tight"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="mt-5 border border-gold py-3 text-[11px] uppercase tracking-[0.24em] text-gold"
          >
            Let's Build
          </button>
        </div>
      </div>
    </header>
  );
}
