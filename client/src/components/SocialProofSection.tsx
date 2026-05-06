/* SocialProofSection — Forge Design System
   Founding creator quotes + stats
*/

const ABSTRACT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663613691422/DCckC5xat7uzqyfGfmhhBT/forge-creator-abstract-3sMioomHhJDV9Tn6N8RzoE.webp";

const quotes = [
  {
    quote: "I replaced my most popular PDF guide with a Forge tool. Same audience, same topic — but 4x more email signups in the first week.",
    name: "Maya R.",
    handle: "@mayafinance",
    niche: "Personal Finance",
    followers: "82K",
    avatar: "MR",
    color: "oklch(0.72 0.17 162)",
  },
  {
    quote: "My macro calculator has been used 12,000 times in 3 months. My YouTube videos get 3,000 views. The tool is now my best distribution channel.",
    name: "Jordan K.",
    handle: "@jordanlifts",
    niche: "Fitness",
    followers: "156K",
    avatar: "JK",
    color: "oklch(0.78 0.18 75)",
  },
  {
    quote: "I built a freelance rate calculator for my audience in 20 minutes. It's now the first thing I send to every new follower. Conversion went from 2% to 11%.",
    name: "Sam T.",
    handle: "@samthefreelancer",
    niche: "Productivity",
    followers: "34K",
    avatar: "ST",
    color: "oklch(0.65 0.18 280)",
  },
];

const stats = [
  { value: "12,000+", label: "tool uses in first 3 months", note: "Jordan K., Fitness" },
  { value: "4x", label: "email signup rate vs PDF", note: "Maya R., Finance" },
  { value: "11%", label: "conversion rate from tool", note: "Sam T., Productivity" },
  { value: "20 min", label: "average time to first tool", note: "Founding creators" },
];

export default function SocialProofSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background image accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10"
        style={{
          backgroundImage: `url(${ABSTRACT})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(ellipse, black 30%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="section-label mb-3">Founding Creators</div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Real tools.
            <br />
            <span className="amber-gradient-text">Real results.</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="forge-card p-4">
              <div
                className="text-2xl font-black mb-1 amber-gradient-text"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {s.value}
              </div>
              <div className="text-xs text-white/55 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {s.label}
              </div>
              <div
                className="text-[10px] text-white/25"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {s.note}
              </div>
            </div>
          ))}
        </div>

        {/* Quotes */}
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <div key={q.name} className="forge-card p-5 flex flex-col">
              {/* Quote */}
              <blockquote
                className="text-sm text-white/65 leading-relaxed flex-1 mb-5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                "{q.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: `${q.color}20`,
                    border: `1px solid ${q.color}40`,
                    color: q.color,
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {q.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/90" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {q.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {q.handle}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border text-white/25"
                      style={{ borderColor: `${q.color}25`, fontFamily: "'JetBrains Mono', monospace" }}>
                      {q.followers}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
