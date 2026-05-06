/* ComparisonSection — Forge Design System
   Why Forge vs existing tools
*/
import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "Built for creators (not devs)", forge: true, typeform: false, bubble: false, notion: false, lovable: null },
  { feature: "No code required", forge: true, typeform: true, bubble: null, notion: true, lovable: null },
  { feature: "Interactive calculations", forge: true, typeform: false, bubble: true, notion: false, lovable: true },
  { feature: "1-click creator branding", forge: true, typeform: null, bubble: false, notion: false, lovable: false },
  { feature: "Native monetization (paywall, lead magnet)", forge: true, typeform: false, bubble: null, notion: false, lovable: false },
  { feature: "Audience intelligence data", forge: true, typeform: null, bubble: null, notion: false, lovable: false },
  { feature: "Niche template library", forge: true, typeform: false, bubble: false, notion: false, lovable: false },
  { feature: "Under 30 min to publish", forge: true, typeform: true, bubble: false, notion: true, lovable: null },
];

const cols = [
  { key: "forge", label: "Forge", highlight: true },
  { key: "typeform", label: "Typeform" },
  { key: "bubble", label: "Bubble" },
  { key: "notion", label: "Notion" },
  { key: "lovable", label: "Lovable" },
];

function Cell({ value }: { value: boolean | null }) {
  if (value === true) return <Check className="w-4 h-4 text-amber-400 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-white/20 mx-auto" />;
  return <Minus className="w-4 h-4 text-white/15 mx-auto" />;
}

export default function ComparisonSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.09 0.008 260)" }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mb-3">Why Forge</div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            The market has tools for developers.
            <br />
            <span className="amber-gradient-text">Not for creators.</span>
          </h2>
          <p
            className="text-white/50 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every existing alternative fails creators in at least one critical way. Forge is the first tool built exclusively for the creator use case.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left pb-4 pr-4 w-[35%]">
                  <span className="text-xs text-white/30" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Feature
                  </span>
                </th>
                {cols.map(col => (
                  <th key={col.key} className="pb-4 text-center">
                    <div
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        col.highlight
                          ? "bg-amber-500/15 border border-amber-500/35 text-amber-400"
                          : "text-white/35"
                      }`}
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {col.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-t ${i % 2 === 0 ? "bg-white/[0.015]" : ""}`}
                  style={{ borderColor: "oklch(1 0 0 / 0.05)" }}
                >
                  <td
                    className="py-3 pr-4 text-sm text-white/60"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {row.feature}
                  </td>
                  {cols.map(col => (
                    <td key={col.key} className="py-3 text-center">
                      <Cell value={row[col.key as keyof typeof row] as boolean | null} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-white/20 mt-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Minus className="w-3 h-3 inline mr-1" />
          = partial support or requires workarounds
        </p>
      </div>
    </section>
  );
}
