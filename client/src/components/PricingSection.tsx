/* PricingSection — Forge Design System
   4-tier pricing: Starter (free), Builder ($19), Studio ($49), Agency ($149)
*/
import { Check, Flame } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    price: "Free",
    priceNote: "forever",
    description: "Test the concept. Build your first tool.",
    highlight: false,
    features: [
      "1 published tool",
      "500 uses / month",
      "Forge branding on tool",
      "All template categories",
      "Public embed link",
    ],
    cta: "Start Free",
    tag: null,
  },
  {
    name: "Builder",
    price: "$19",
    priceNote: "/ month",
    description: "For full-time creators building their first tools.",
    highlight: false,
    features: [
      "5 published tools",
      "5,000 uses / month",
      "Custom branding (logo, colors, font)",
      "Email integrations (ConvertKit, Mailchimp)",
      "Lead magnet mode",
      "Embed anywhere",
    ],
    cta: "Get Builder",
    tag: null,
  },
  {
    name: "Studio",
    price: "$49",
    priceNote: "/ month",
    description: "For creators running tools as a core revenue stream.",
    highlight: true,
    features: [
      "Unlimited tools",
      "Unlimited uses",
      "All integrations (Stripe, Patreon, Discord)",
      "Paywall & community perk modes",
      "Audience Intelligence Dashboard",
      "Priority support",
      "Custom domain embed",
    ],
    cta: "Get Studio",
    tag: "Most Popular",
  },
  {
    name: "Agency",
    price: "$149",
    priceNote: "/ month",
    description: "For agencies managing tools for multiple creator clients.",
    highlight: false,
    features: [
      "Everything in Studio",
      "White-label (remove Forge branding)",
      "Client management dashboard",
      "5 team seats",
      "Priority onboarding",
      "SLA support",
    ],
    cta: "Get Agency",
    tag: null,
  },
];

export default function PricingSection() {
  const handleCTA = (planName: string) => {
    toast.success(`${planName} plan — Early access waitlist coming soon!`, {
      description: "We'll notify you when Forge launches.",
      duration: 4000,
    });
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.11 0.008 260)" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse, oklch(0.78 0.18 75), transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label mb-3">Pricing</div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Priced for creators,
            <br />
            <span className="amber-gradient-text">not agencies.</span>
          </h2>
          <p
            className="text-white/50 text-lg max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The $10–$50/month gap in creator tools is almost entirely empty. Forge lives there intentionally.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-6 flex flex-col ${
                plan.highlight
                  ? "forge-glow"
                  : ""
              }`}
              style={{
                background: plan.highlight
                  ? "oklch(0.15 0.010 260)"
                  : "oklch(0.13 0.008 260)",
                border: plan.highlight
                  ? "1px solid oklch(0.78 0.18 75 / 0.35)"
                  : "1px solid oklch(1 0 0 / 0.08)",
              }}
            >
              {/* Popular tag */}
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-[oklch(0.09_0.008_260)]">
                  <Flame className="w-3 h-3" />
                  <span className="text-[10px] font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {plan.tag}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-4">
                <h3
                  className="text-base font-bold text-white mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-xs text-white/40 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-5 pb-5 border-b border-white/[0.06]">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-3xl font-black ${plan.highlight ? "amber-gradient-text" : "text-white"}`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm text-white/40"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {plan.priceNote}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      style={{ color: plan.highlight ? "oklch(0.78 0.18 75)" : "oklch(0.72 0.17 162)" }}
                    />
                    <span
                      className="text-xs text-white/55 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleCTA(plan.name)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "forge-btn-primary"
                    : "forge-btn-outline"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-white/25 mt-8" style={{ fontFamily: "'Inter', sans-serif" }}>
          All plans include a 14-day free trial. No credit card required for Starter. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
