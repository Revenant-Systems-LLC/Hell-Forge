/* HeroSection — Forge Design System
   Asymmetric split: headline left 55%, live mini-demo right 45%
   Background: hero image with dark overlay + noise grain
*/
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap, Users, TrendingUp } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663613691422/DCckC5xat7uzqyfGfmhhBT/forge-hero-bg-U8x76N6dmm8Ck7mL9QmzVB.webp";

function useCountUp(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function MiniCalcDemo() {
  const [income, setIncome] = useState(5000);
  const [rate, setRate] = useState(15);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const monthly = Math.round(income * (rate / 100));
  const annual = monthly * 12;
  const annualCount = useCountUp(annual, 1000, started);

  return (
    <div ref={ref} className="forge-card p-5 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="live-dot" />
            <span className="section-label">Live Demo</span>
          </div>
          <h3 className="text-sm font-semibold text-white/90" style={{ fontFamily: "'Syne', sans-serif" }}>
            Freelance Rate Calculator
          </h3>
        </div>
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>Monthly Revenue</label>
            <span className="text-xs font-medium text-amber-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ${income.toLocaleString()}
            </span>
          </div>
          <input
            type="range" min={1000} max={20000} step={500}
            value={income} onChange={e => setIncome(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[10px] text-white/25">$1k</span>
            <span className="text-[10px] text-white/25">$20k</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>Tool Revenue Rate</label>
            <span className="text-xs font-medium text-amber-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {rate}%
            </span>
          </div>
          <input
            type="range" min={5} max={40} step={1}
            value={rate} onChange={e => setRate(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[10px] text-white/25">5%</span>
            <span className="text-[10px] text-white/25">40%</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
        <div className="text-xs text-white/40 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Projected Annual Tool Revenue
        </div>
        <div className="text-2xl font-bold count-up">
          ${started ? annualCount.toLocaleString() : "0"}
        </div>
        <div className="text-xs text-white/40 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          ${monthly.toLocaleString()} / month from your tools
        </div>
      </div>

      {/* CTA */}
      <div className="mt-3 text-center">
        <span className="text-[11px] text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
          Built with Forge in 12 minutes
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const scrollToDemo = () => document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
  const scrollToPricing = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, oklch(0.09 0.008 260) 0%, oklch(0.07 0.006 260) 100%)`,
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.008_260)] via-[oklch(0.09_0.008_260/0.85)] to-transparent" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.09_0.008_260)] to-transparent" />

      <div className="container relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">
          {/* Left: Headline */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-6">
              <div className="live-dot" />
              <span className="section-label">Creator-Native Builder</span>
            </div>

            <h1
              className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[0.95] mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-white">Build tools</span>
              <br />
              <span className="amber-gradient-text">your audience</span>
              <br />
              <span className="text-white">uses every day.</span>
            </h1>

            <p
              className="text-lg text-white/55 leading-relaxed mb-8 max-w-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Forge lets any creator build branded, interactive tools — calculators, trackers, quizzes — and deploy them as lead magnets or paid products. No code. No developers. Under 30 minutes.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: <Zap className="w-3.5 h-3.5" />, value: "< 30 min", label: "to first tool" },
                { icon: <Users className="w-3.5 h-3.5" />, value: "40+", label: "niche templates" },
                { icon: <TrendingUp className="w-3.5 h-3.5" />, value: "4 modes", label: "to monetize" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <div className="text-amber-400/70">{stat.icon}</div>
                  <span
                    className="text-sm font-semibold text-white/90"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToDemo}
                className="flex items-center gap-2 px-6 py-3 rounded-xl forge-btn-primary text-sm font-semibold"
              >
                Try a Live Demo
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={scrollToPricing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl forge-btn-outline text-sm"
              >
                Get Early Access
              </button>
            </div>

            {/* Social proof */}
            <p className="mt-5 text-xs text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
              Joining 15 founding creators across finance, fitness, productivity, travel & business
            </p>
          </div>

          {/* Right: Live mini demo */}
          <div className="flex justify-center lg:justify-end">
            <MiniCalcDemo />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[10px] text-white/50 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
