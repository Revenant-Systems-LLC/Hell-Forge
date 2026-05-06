/* Navigation — Forge Design System: Dark glass nav, amber accent */
import { useState, useEffect } from "react";
import { Flame } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "forge-glass border-b border-white/[0.06] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Forge
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded border border-amber-500/30 text-amber-400/80"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em" }}
          >
            by Revenant
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Live Demos", id: "demos" },
            { label: "Pricing", id: "pricing" },
            { label: "Templates", id: "templates" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm text-white/60 hover:text-white/90 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo("demos")}
            className="text-sm px-4 py-2 rounded-lg forge-btn-outline"
          >
            Try a Demo
          </button>
          <button
            onClick={() => scrollTo("pricing")}
            className="text-sm px-4 py-2 rounded-lg forge-btn-primary"
          >
            Get Early Access
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white/90"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden forge-glass border-t border-white/[0.06] mt-1">
          <div className="container py-4 flex flex-col gap-3">
            {[
              { label: "How It Works", id: "how-it-works" },
              { label: "Live Demos", id: "demos" },
              { label: "Pricing", id: "pricing" },
              { label: "Templates", id: "templates" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm text-white/70 hover:text-white py-2 border-b border-white/[0.05]"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("pricing")}
              className="mt-2 w-full py-2.5 rounded-lg forge-btn-primary text-sm"
            >
              Get Early Access
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
