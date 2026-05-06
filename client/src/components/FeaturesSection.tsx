/* FeaturesSection — Forge Design System
   Asymmetric grid showcasing 5 key features with visual accents
*/
import { LayoutTemplate, Palette, DollarSign, BarChart3, Zap } from "lucide-react";

const TOOL_PREVIEW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663613691422/DCckC5xat7uzqyfGfmhhBT/forge-tool-preview-7eHj7oviGAkcokRSCkWKgr.webp";

const features = [
  {
    icon: <LayoutTemplate className="w-5 h-5" />,
    title: "Recipe Library",
    description: "40+ pre-built templates for finance, fitness, productivity, travel, and business. Pick one and customize — no blank canvas required.",
    tags: ["40+ templates", "5 niches"],
    wide: false,
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "1-Click Branding Engine",
    description: "Upload your logo, set your colors, choose your font. Every tool you build is automatically styled to match your brand — it looks like your design team built it.",
    tags: ["Logo upload", "Custom colors", "Font selection"],
    wide: false,
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Native Monetization",
    description: "Deploy as a free lead magnet, paid product, or community perk. Integrates with ConvertKit, Stripe, Patreon, and Discord. Monetization is built in — not bolted on.",
    tags: ["Lead magnet", "Paywall", "Community perk"],
    wide: true,
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Audience Intelligence",
    description: "Because your tools are interactive, they collect zero-party data. See exactly what your audience struggles with — their goals, their gaps, their numbers.",
    tags: ["Zero-party data", "Aggregate insights"],
    wide: false,
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Visual Logic Builder",
    description: "Define your tool's behavior in plain language. No formulas, no code. \"If income is above X, show this result.\" The logic is generated automatically.",
    tags: ["No code", "Plain language", "Auto-logic"],
    wide: false,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.11 0.008 260)" }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04]"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.18 75), transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="section-label mb-3">Platform Features</div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Everything a creator
              <br />
              <span className="amber-gradient-text">needs to build.</span>
            </h2>
          </div>
          <div>
            <p
              className="text-white/50 text-lg leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Forge is opinionated by design. Every feature is built for creators, not engineers. No tutorials. No developer mindset required.
            </p>
          </div>
        </div>

        {/* Feature grid + image */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`forge-card p-5 group relative overflow-hidden ${f.wide ? "sm:col-span-2" : ""}`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top left, oklch(0.78 0.18 75 / 0.05), transparent 60%)" }}
                />

                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 group-hover:bg-amber-500/15 transition-colors">
                    {f.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-sm font-bold text-white mb-1.5"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="text-xs text-white/45 leading-relaxed mb-3"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {f.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {f.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product screenshot */}
          <div className="hidden lg:block sticky top-24">
            <div className="forge-card overflow-hidden">
              <div className="p-3 border-b border-white/[0.06] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center text-[10px] text-white/25" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  forge.app — builder
                </div>
              </div>
              <img
                src={TOOL_PREVIEW}
                alt="Forge builder interface"
                className="w-full"
              />
            </div>
            <p className="text-center text-xs text-white/25 mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              The Forge builder interface
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
