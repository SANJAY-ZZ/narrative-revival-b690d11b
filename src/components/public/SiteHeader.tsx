import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Ring } from "@/components/orvnt/Ring";
import { DOMAINS } from "@/data/mock";
import { useTheme } from "@/lib/theme";

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

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative h-7 w-[52px] rounded-full border border-border-strong bg-secondary transition-colors"
    >
      <span
        className="absolute top-[2px] left-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-full text-ink transition-transform duration-500"
        style={{ background: "var(--gold)", transform: theme === "dark" ? "translateX(24px)" : "none" }}
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

/** Fixed minimal header used on every public page other than the cinematic home. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "relative py-1 text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-all duration-500"
      style={{
        borderColor: scrolled ? "var(--color-border)" : "transparent",
        background: scrolled ? "var(--header-bg)" : "var(--color-background)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        padding: scrolled ? "14px 0" : "20px 0",
      }}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label="ORVNT home">
          <Ring size={24} />
          <span className="font-[family-name:var(--font-display)] text-[14px] font-semibold tracking-[0.38em]">
            ORVNT
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <Link to="/about" className={linkClass} activeProps={{ style: { color: "var(--color-foreground)" } }}>
            About
          </Link>
          {DOMAINS.map((d) => (
            <Link
              key={d.slug}
              to="/domains/$slug"
              params={{ slug: d.slug }}
              className={linkClass}
              activeProps={{ style: { color: "var(--color-foreground)" } }}
            >
              {d.navLabel}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden border border-border-strong px-5 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors hover:border-gold hover:text-gold sm:block"
          >
            Let's Build
          </Link>
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

      <div
        className="overflow-hidden border-t transition-[max-height,opacity] duration-500 lg:hidden"
        style={{
          maxHeight: open ? 520 : 0,
          opacity: open ? 1 : 0,
          borderColor: open ? "var(--color-border)" : "transparent",
          background: "var(--color-background)",
        }}
      >
        <div className="wrap flex flex-col py-4">
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="border-b border-border py-4 font-[family-name:var(--font-display)] text-lg tracking-tight"
          >
            About
          </Link>
          {DOMAINS.map((d) => (
            <Link
              key={d.slug}
              to="/domains/$slug"
              params={{ slug: d.slug }}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-[family-name:var(--font-display)] text-lg tracking-tight"
            >
              {d.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 border border-gold py-3 text-center text-[11px] tracking-[0.24em] text-gold uppercase"
          >
            Let's Build
          </Link>
        </div>
      </div>
    </header>
  );
}
