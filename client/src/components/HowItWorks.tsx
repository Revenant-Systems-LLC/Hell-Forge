/* HowItWorks — Forge Design System
   3-step process with numbered cards and amber accents
*/
import { BookOpen, Palette, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <BookOpen className="w-5 h-5" />,
    title: "Pick a Recipe",
    description:
      "Choose from 40+ pre-built templates designed for your niche — finance calculators, fitness trackers, productivity assessments, and more. Each template is a fully functional tool, not a blank canvas.",
    tag: "40+ templates",
  },
  {
    number: "02",
    icon: <Palette className="w-5 h-5" />,
    title: "Brand It in One Click",
    description:
      "Upload your logo, select your colors, choose your font. Forge automatically applies your brand identity across the entire tool — it looks like your design team built it overnight.",
    tag: "1-click branding",
  },
  {
    number: "03",
    icon: <Rocket className="w-5 h-5" />,
    title: "Deploy & Monetize",
    description:
      "Publish as a free lead magnet, a paid product, or a community perk. Forge integrates natively with ConvertKit, Stripe, Patreon, and more. Your tool is live and earning in under 30 minutes.",
    tag: "4 monetization modes",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse, oklch(0.78 0.18 75), transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <div className="section-label mb-3">How It Works</div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            From idea to live tool
            <br />
            <span className="amber-gradient-text">in under 30 minutes.</span>
          </h2>
          <p
            className="text-white/50 text-lg max-w-xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            No tutorials. No developers. No compromises. Forge is opinionated by design — every decision is made for creators, not engineers.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="forge-card p-6 group relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top left, oklch(0.78 0.18 75 / 0.06), transparent 60%)" }}
              />

              {/* Number */}
              <div
                className="text-5xl font-black mb-4 leading-none"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "oklch(0.78 0.18 75 / 0.15)",
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500/15 transition-colors">
                {step.icon}
              </div>

              {/* Content */}
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-white/50 text-sm leading-relaxed mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {step.description}
              </p>

              {/* Tag */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/8 border border-amber-500/20">
                <span className="section-label" style={{ fontSize: "0.65rem" }}>{step.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Connector line (desktop) */}
        <div className="hidden md:block relative -mt-[calc(100%-1rem)] pointer-events-none">
          {/* decorative — handled by grid gap */}
        </div>
      </div>
    </section>
  );
}
