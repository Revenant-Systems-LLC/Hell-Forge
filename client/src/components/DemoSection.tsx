/* DemoSection — Forge Design System
   Three live interactive tool demos:
   1. Macro Calculator (fitness)
   2. Debt Payoff Tracker (finance)
   3. Creator Niche Quiz (business)
*/
import { useState, useEffect, useRef } from "react";
import { Dumbbell, DollarSign, Lightbulb, ChevronRight } from "lucide-react";

// ─── Utility ────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 900, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    setVal(0);
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, trigger]);
  return val;
}

// ─── Tool 1: Macro Calculator ───────────────────────────────────────────────
function MacroCalculator() {
  const [weight, setWeight] = useState(75);
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk">("maintain");
  const [activity, setActivity] = useState(1.55);
  const [calculated, setCalculated] = useState(false);

  const bmr = Math.round(10 * weight + 6.25 * 170 - 5 * 28 + 5);
  const tdee = Math.round(bmr * activity);
  const multipliers = { cut: 0.8, maintain: 1.0, bulk: 1.15 };
  const calories = Math.round(tdee * multipliers[goal]);
  const protein = Math.round(weight * 2.2);
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

  const calCount = useCountUp(calories, 800, calculated);
  const protCount = useCountUp(protein, 700, calculated);
  const carbCount = useCountUp(carbs, 750, calculated);
  const fatCount = useCountUp(fat, 680, calculated);

  return (
    <div className="space-y-5">
      {/* Weight */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-xs text-white/50">Body Weight</label>
          <span className="text-xs text-amber-400 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {weight} kg
          </span>
        </div>
        <input type="range" min={40} max={150} value={weight}
          onChange={e => { setWeight(Number(e.target.value)); setCalculated(false); }}
          className="w-full" />
      </div>

      {/* Goal */}
      <div>
        <label className="text-xs text-white/50 block mb-2">Goal</label>
        <div className="grid grid-cols-3 gap-2">
          {(["cut", "maintain", "bulk"] as const).map(g => (
            <button key={g}
              onClick={() => { setGoal(g); setCalculated(false); }}
              className={`py-2 rounded-lg text-xs font-semibold transition-all capitalize ${
                goal === g
                  ? "bg-amber-500/20 border border-amber-500/50 text-amber-400"
                  : "bg-white/5 border border-white/10 text-white/50 hover:border-white/20"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <label className="text-xs text-white/50 block mb-2">Activity Level</label>
        <select
          value={activity}
          onChange={e => { setActivity(Number(e.target.value)); setCalculated(false); }}
          className="w-full forge-input rounded-lg px-3 py-2 text-xs"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <option value={1.2}>Sedentary (desk job)</option>
          <option value={1.375}>Light (1–3x/week)</option>
          <option value={1.55}>Moderate (3–5x/week)</option>
          <option value={1.725}>Active (6–7x/week)</option>
          <option value={1.9}>Very Active (2x/day)</option>
        </select>
      </div>

      {/* Calculate */}
      <button
        onClick={() => setCalculated(true)}
        className="w-full py-2.5 rounded-xl forge-btn-primary text-sm font-semibold"
      >
        Calculate My Macros
      </button>

      {/* Results */}
      {calculated && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          {[
            { label: "Calories", value: calCount, unit: "kcal", highlight: true },
            { label: "Protein", value: protCount, unit: "g" },
            { label: "Carbs", value: carbCount, unit: "g" },
            { label: "Fat", value: fatCount, unit: "g" },
          ].map(item => (
            <div key={item.label}
              className={`p-3 rounded-lg border ${
                item.highlight
                  ? "bg-amber-500/8 border-amber-500/25 col-span-2"
                  : "bg-white/3 border-white/8"
              }`}
            >
              <div className="text-[10px] text-white/40 mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                {item.label}
              </div>
              <div className={`font-bold ${item.highlight ? "text-xl count-up" : "text-base text-white/80"}`}
                style={{ fontFamily: "'JetBrains Mono', monospace", color: item.highlight ? undefined : undefined }}>
                {item.value.toLocaleString()}
                <span className="text-xs font-normal text-white/40 ml-1">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tool 2: Debt Payoff Tracker ────────────────────────────────────────────
function DebtPayoff() {
  const [debt, setDebt] = useState(12000);
  const [rate, setRate] = useState(19.9);
  const [payment, setPayment] = useState(400);
  const [calculated, setCalculated] = useState(false);

  const monthlyRate = rate / 100 / 12;
  const months = monthlyRate > 0
    ? Math.ceil(-Math.log(1 - (debt * monthlyRate) / payment) / Math.log(1 + monthlyRate))
    : Math.ceil(debt / payment);
  const totalPaid = payment * months;
  const totalInterest = totalPaid - debt;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  const monthCount = useCountUp(months, 700, calculated);
  const interestCount = useCountUp(totalInterest, 900, calculated);

  const minPayment = Math.ceil(debt * monthlyRate * 1.05);
  const isValid = payment > minPayment && months > 0 && months < 600;

  return (
    <div className="space-y-5">
      {/* Debt amount */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-xs text-white/50">Total Debt</label>
          <span className="text-xs text-amber-400 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ${debt.toLocaleString()}
          </span>
        </div>
        <input type="range" min={1000} max={50000} step={500}
          value={debt} onChange={e => { setDebt(Number(e.target.value)); setCalculated(false); }}
          className="w-full" />
      </div>

      {/* Interest rate */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-xs text-white/50">Annual Interest Rate</label>
          <span className="text-xs text-amber-400 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {rate}%
          </span>
        </div>
        <input type="range" min={0} max={35} step={0.1}
          value={rate} onChange={e => { setRate(Number(e.target.value)); setCalculated(false); }}
          className="w-full" />
      </div>

      {/* Monthly payment */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-xs text-white/50">Monthly Payment</label>
          <span className="text-xs text-amber-400 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ${payment.toLocaleString()}
          </span>
        </div>
        <input type="range" min={100} max={2000} step={25}
          value={payment} onChange={e => { setPayment(Number(e.target.value)); setCalculated(false); }}
          className="w-full" />
        {payment <= minPayment && (
          <p className="text-[10px] text-red-400/70 mt-1">Minimum payment must exceed ${minPayment}/mo to reduce balance</p>
        )}
      </div>

      <button
        onClick={() => setCalculated(true)}
        disabled={!isValid}
        className="w-full py-2.5 rounded-xl forge-btn-primary text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Calculate Payoff Plan
      </button>

      {calculated && isValid && (
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-amber-500/8 border border-amber-500/25">
            <div className="text-[10px] text-white/40 mb-0.5">Debt-Free In</div>
            <div className="text-xl font-bold count-up">
              {years > 0 ? `${years}y ` : ""}{remMonths}mo
            </div>
            <div className="text-[10px] text-white/30 mt-0.5">({monthCount} total payments)</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-white/3 border border-white/8">
              <div className="text-[10px] text-white/40 mb-0.5">Total Interest</div>
              <div className="text-base font-bold text-red-400/80" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                ${interestCount.toLocaleString()}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/3 border border-white/8">
              <div className="text-[10px] text-white/40 mb-0.5">Total Paid</div>
              <div className="text-base font-bold text-white/70" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                ${(payment * months).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tool 3: Creator Niche Quiz ──────────────────────────────────────────────
const quizQuestions = [
  {
    q: "What type of content do you create most?",
    options: ["Educational / How-to", "Entertainment / Lifestyle", "Reviews / Comparisons", "Personal Brand / Story"],
  },
  {
    q: "What's your primary audience size?",
    options: ["Under 5K", "5K – 50K", "50K – 500K", "500K+"],
  },
  {
    q: "What's your biggest monetization challenge?",
    options: ["Getting people to pay", "Standing out from competitors", "Converting followers to buyers", "Creating enough content"],
  },
];

const results: Record<string, { title: string; tool: string; desc: string }> = {
  "0-0": { title: "The Knowledge Seller", tool: "Skill Assessment Quiz", desc: "Your audience wants to know where they stand. A quiz that scores their current skill level and gives personalized next steps will convert at 3–5x a standard lead magnet." },
  "0-1": { title: "The Curriculum Builder", tool: "Learning Path Generator", desc: "You have structured knowledge. A tool that creates a custom study plan based on someone's goals and current level is the perfect entry point to your paid courses." },
  "1-0": { title: "The Lifestyle Architect", tool: "Habit Tracker & Scorer", desc: "Your audience follows you for inspiration. A branded habit tracker that scores their weekly consistency keeps them coming back — and keeps your brand top of mind." },
  "2-0": { title: "The Comparison Engine", tool: "Product Comparison Tool", desc: "You're trusted to cut through the noise. A side-by-side comparison tool for your niche (cameras, supplements, software) is the highest-value lead magnet you can build." },
  "3-0": { title: "The Brand Builder", tool: "Personal Brand Scorecard", desc: "Your story is your product. An audit tool that scores someone's personal brand across 5 dimensions gives instant value and positions you as the guide to improve it." },
};

function CreatorQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const answer = (idx: number) => {
    const next = [...answers, idx];
    setAnswers(next);
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => { setAnswers([]); setCurrent(0); setDone(false); };

  const resultKey = done ? `${answers[0]}-${answers[2]}` : "";
  const result = results[resultKey] || results["0-0"];

  if (done) {
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/25">
          <div className="section-label mb-2">Your Creator Archetype</div>
          <div className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            {result.title}
          </div>
          <div className="text-xs text-amber-400 font-medium mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Recommended Tool: {result.tool}
          </div>
          <p className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            {result.desc}
          </p>
        </div>
        <button
          onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
          className="w-full py-2.5 rounded-xl forge-btn-primary text-sm font-semibold flex items-center justify-center gap-2"
        >
          Build This Tool on Forge
          <ChevronRight className="w-4 h-4" />
        </button>
        <button onClick={reset} className="w-full py-2 text-xs text-white/30 hover:text-white/50 transition-colors">
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = quizQuestions[current];
  const progress = (current / quizQuestions.length) * 100;

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div>
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] text-white/30" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Question {current + 1} of {quizQuestions.length}
          </span>
          <span className="text-[10px] text-amber-400/60" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <p className="text-sm font-semibold text-white/90 leading-relaxed" style={{ fontFamily: "'Syne', sans-serif" }}>
        {q.q}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => answer(i)}
            className="w-full text-left px-4 py-3 rounded-lg border border-white/8 bg-white/3 text-sm text-white/60 hover:border-amber-500/40 hover:bg-amber-500/5 hover:text-white/90 transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Demo Section ───────────────────────────────────────────────────────
const tabs = [
  { id: "macro", label: "Macro Calculator", icon: <Dumbbell className="w-4 h-4" />, niche: "Fitness", component: <MacroCalculator /> },
  { id: "debt", label: "Debt Payoff", icon: <DollarSign className="w-4 h-4" />, niche: "Finance", component: <DebtPayoff /> },
  { id: "quiz", label: "Creator Quiz", icon: <Lightbulb className="w-4 h-4" />, niche: "Business", component: <CreatorQuiz /> },
];

export default function DemoSection() {
  const [active, setActive] = useState("macro");
  const activeTab = tabs.find(t => t.id === active)!;

  return (
    <section id="demos" className="py-24 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.78 0.18 75), transparent)" }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mb-3">Interactive Demos</div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            These tools were built
            <br />
            <span className="amber-gradient-text">on Forge. Try them now.</span>
          </h2>
          <p
            className="text-white/50 text-lg max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every tool below was built using a Forge template. No code. No designers. Real tools your audience will use every day.
          </p>
        </div>

        {/* Demo container */}
        <div className="max-w-2xl mx-auto">
          {/* Tab switcher */}
          <div className="flex gap-2 mb-6 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  active === tab.id
                    ? "bg-amber-500/15 border border-amber-500/30 text-amber-400"
                    : "text-white/40 hover:text-white/60"
                }`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.niche}</span>
              </button>
            ))}
          </div>

          {/* Tool card */}
          <div className="forge-card p-6">
            {/* Tool header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="live-dot" />
                  <span className="section-label">Live — {activeTab.niche} Niche</span>
                </div>
                <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {activeTab.label}
                </h3>
              </div>
              <div className="text-xs px-2.5 py-1 rounded-full bg-amber-500/8 border border-amber-500/20 text-amber-400/80"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>
                Built with Forge
              </div>
            </div>

            {/* Tool content */}
            <div key={active}>
              {activeTab.component}
            </div>
          </div>

          {/* Bottom note */}
          <p className="text-center text-xs text-white/25 mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            These demos are live. Your inputs are not stored. Build your own version in under 30 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
