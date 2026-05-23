const features = [
  {
    icon: "ri-book-open-line",
    title: "Trading Journal",
    desc: "Track every trade with complete entry, exit, quantity, and performance history.",
  },
  {
    icon: "ri-line-chart-line",
    title: "Live Unrealized P&L",
    desc: "Monitor open positions and floating profit/loss in real-time.",
  },
  {
    icon: "ri-eye-line",
    title: "Focused Watchlists",
    desc: "Track high-conviction setups instead of watching hundreds of random stocks.",
  },
  {
    icon: "ri-bar-chart-2-line",
    title: "TradingView Charts",
    desc: "Analyze market structure with professional charting tools and indicators.",
  },
  {
    icon: "ri-newspaper-line",
    title: "Market News",
    desc: "Stay updated with important market-moving financial news.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Performance Review",
    desc: "Review winning and losing trades to improve decision-making.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="px-4 py-20 bg-bg-surface border-y border-bg-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="st-badge-ghost mb-4 inline-block">
            Platform Features
          </span>

          <h2
            className="text-text-primary font-semibold"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            Tools Built For Retail Traders
          </h2>

          <p className="text-text-muted text-md mt-3 max-w-2xl mx-auto">
            StockTally combines trade journaling, performance tracking, market
            analysis, and trading education into one focused platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="st-card p-6 hover:border-green-border transition-all duration-normal"
            >
              <div className="w-11 h-11 rounded-xl bg-green-900 border border-green-border flex items-center justify-center mb-4">
                <i className={`${f.icon} text-green-400 text-xl`} />
              </div>

              <h3 className="text-text-primary text-lg font-medium mb-3">
                {f.title}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
