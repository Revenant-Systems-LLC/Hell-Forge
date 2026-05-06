/* Footer + Final CTA — Forge Design System */
import { Flame, ArrowRight, Twitter, Github, Youtube } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    toast.success("You're on the list!", {
      description: "We'll reach out when Forge opens early access.",
      duration: 5000,
    });
  };

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.07 0.006 260)" }}
      />
      {/* Amber glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.08]"
        style={{ background: "radial-gradient(ellipse, oklch(0.78 0.18 75), transparent 65%)" }}
      />

      <div className="container relative z-10 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/25 mb-6 mx-auto">
          <Flame className="w-8 h-8 text-amber-400" />
        </div>

        <h2
          className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Stop making content.
          <br />
          <span className="amber-gradient-text">Start building tools.</span>
        </h2>

        <p
          className="text-white/50 text-lg max-w-xl mx-auto mb-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Content is consumed once. A tool is used every week. Forge is the fastest way to build something your audience returns to — and pays for.
        </p>

        {/* Email capture */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-5">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 forge-input rounded-xl px-4 py-3 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl forge-btn-primary text-sm font-semibold whitespace-nowrap"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-5">
            <div className="live-dot" />
            <span className="text-sm text-amber-400" style={{ fontFamily: "'Syne', sans-serif" }}>
              You're on the early access list
            </span>
          </div>
        )}

        <p className="text-xs text-white/25" style={{ fontFamily: "'Inter', sans-serif" }}>
          Joining 15 founding creators. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <>
      <FinalCTA />

      <footer
        className="border-t border-white/[0.06] py-10"
        style={{ background: "oklch(0.07 0.006 260)" }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span
                className="text-sm font-bold text-white/80"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Forge
              </span>
              <span
                className="text-xs text-white/25"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                by Revenant Systems
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Docs", "Blog"].map(link => (
                <button
                  key={link}
                  onClick={() => toast.info(`${link} — coming soon`)}
                  className="text-xs text-white/30 hover:text-white/55 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                { icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
                { icon: <Github className="w-4 h-4" />, label: "GitHub" },
              ].map(s => (
                <button
                  key={s.label}
                  onClick={() => toast.info(`${s.label} — coming soon`)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/35 hover:text-white/65 hover:border-white/15 transition-all"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
            <p
              className="text-xs text-white/20"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              © 2026 Revenant Systems. All rights reserved. Built with Forge.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
