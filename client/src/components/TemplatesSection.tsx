/* TemplatesSection — Forge Design System
   Niche categories with template examples
*/
import { TrendingUp, Dumbbell, Briefcase, Plane, ShoppingBag } from "lucide-react";

const niches = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    name: "Finance & Money",
    color: "oklch(0.72 0.17 162)",
    colorDim: "oklch(0.72 0.17 162 / 0.12)",
    colorBorder: "oklch(0.72 0.17 162 / 0.25)",
    templates: [
      "Debt Payoff Calculator",
      "Compound Interest Visualizer",
      "Emergency Fund Estimator",
      "Freelance Rate Calculator",
      "Savings Goal Tracker",
      "Net Worth Snapshot",
    ],
  },
  {
    icon: <Dumbbell className="w-5 h-5" />,
    name: "Health & Fitness",
    color: "oklch(0.78 0.18 75)",
    colorDim: "oklch(0.78 0.18 75 / 0.10)",
    colorBorder: "oklch(0.78 0.18 75 / 0.25)",
    templates: [
      "Macro & Calorie Calculator",
      "One-Rep Max Estimator",
      "Workout Volume Tracker",
      "Body Fat Estimator",
      "Hydration Calculator",
      "Race Pace Predictor",
    ],
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    name: "Productivity & Career",
    color: "oklch(0.65 0.18 280)",
    colorDim: "oklch(0.65 0.18 280 / 0.12)",
    colorBorder: "oklch(0.65 0.18 280 / 0.25)",
    templates: [
      "Freelance Profitability Calc",
      "Resume Keyword Scorer",
      "Time Audit Tool",
      "Meeting Cost Calculator",
      "Goal-Setting Framework",
      "Focus Session Timer",
    ],
  },
  {
    icon: <Plane className="w-5 h-5" />,
    name: "Travel & Lifestyle",
    color: "oklch(0.70 0.16 200)",
    colorDim: "oklch(0.70 0.16 200 / 0.12)",
    colorBorder: "oklch(0.70 0.16 200 / 0.25)",
    templates: [
      "Trip Budget Estimator",
      "Packing List Generator",
      "Destination Comparator",
      "Travel Day Planner",
      "Currency Converter",
      "Visa Requirement Checker",
    ],
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    name: "Business & Marketing",
    color: "oklch(0.68 0.18 35)",
    colorDim: "oklch(0.68 0.18 35 / 0.12)",
    colorBorder: "oklch(0.68 0.18 35 / 0.25)",
    templates: [
      "Email List Growth Projector",
      "Content ROI Estimator",
      "Pricing Strategy Calculator",
      "Launch Revenue Forecaster",
      "Brand Audit Scorecard",
      "Creator Niche Quiz",
    ],
  },
];

export default function TemplatesSection() {
  return (
    <section id="templates" className="py-24 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label mb-3">Recipe Library</div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            40+ templates across
            <br />
            <span className="amber-gradient-text">every creator niche.</span>
          </h2>
          <p
            className="text-white/50 text-lg max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every template is a fully functional tool — not a blank canvas. Pick one, brand it, and publish. Your audience gets something useful on day one.
          </p>
        </div>

        {/* Niche grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {niches.map((niche) => (
            <div key={niche.name} className="forge-card p-5 group">
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors"
                style={{
                  background: niche.colorDim,
                  border: `1px solid ${niche.colorBorder}`,
                  color: niche.color,
                }}
              >
                {niche.icon}
              </div>

              {/* Niche name */}
              <h3
                className="text-sm font-bold text-white mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {niche.name}
              </h3>

              {/* Template list */}
              <ul className="space-y-1.5">
                {niche.templates.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 text-xs text-white/45 group-hover:text-white/55 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <div
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: niche.color, opacity: 0.6 }}
                    />
                    {t}
                  </li>
                ))}
              </ul>

              {/* Count badge */}
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <span
                  className="text-[10px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: niche.color, opacity: 0.7 }}
                >
                  {niche.templates.length} templates
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-white/30 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Can't find your niche? Forge's visual logic builder lets you build from scratch in minutes.
          </p>
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-xl forge-btn-outline text-sm"
          >
            Browse All Templates →
          </button>
        </div>
      </div>
    </section>
  );
}
