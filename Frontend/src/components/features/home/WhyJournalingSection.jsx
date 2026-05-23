import { Link } from "react-router-dom";

const points = [
  {
    icon: "ri-emotion-unhappy-line",
    title: "Emotional Trading",
    desc: "Most traders repeat emotional mistakes because they never review their decisions objectively.",
  },
  {
    icon: "ri-bar-chart-box-line",
    title: "No Performance Tracking",
    desc: "Without a trading journal, it's impossible to know which setups actually work consistently.",
  },
  {
    icon: "ri-repeat-line",
    title: "Repeating Costly Habits",
    desc: "Small bad habits compound over time and silently damage long-term profitability.",
  },
];

const improvements = [
  "Better trade discipline",
  "More consistent execution",
  "Improved risk management",
  "Clear performance review",
];

const WhyJournalingSection = () => {
  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="st-badge-amber mb-4 inline-block">
            Trading Psychology
          </span>

          <h2
            className="text-text-primary font-semibold leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
          >
            Why Most Traders Never Improve
          </h2>

          <p className="text-text-muted text-md mt-4 max-w-2xl mx-auto leading-relaxed">
            Successful trading is not only about finding stocks. It's about
            building discipline, reviewing mistakes, understanding psychology,
            and improving decision-making over time.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Problems */}
          <div className="flex flex-col gap-5">
            {points.map((point) => (
              <div key={point.title} className="st-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-red-900 border border-red-border flex items-center justify-center shrink-0">
                    <i className={`${point.icon} text-red-400 text-xl`} />
                  </div>

                  <div>
                    <h3 className="text-text-primary text-lg font-medium mb-2">
                      {point.title}
                    </h3>

                    <p className="text-text-muted text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Solution Card */}
          <div className="st-card p-8 flex flex-col justify-between">
            <div>
              <span className="st-badge-green mb-4 inline-block">
                How StockTally Helps
              </span>

              <h3 className="text-text-primary text-2xl font-semibold mb-5">
                Structured Journaling Creates Better Traders
              </h3>

              <div className="flex flex-col gap-4 text-text-muted leading-relaxed text-sm">
                <p>
                  Trade journaling helps traders identify patterns, remove
                  emotional decision-making, and build a repeatable trading
                  process.
                </p>

                <p>
                  Reviewing your entries, exits, risk management, and mistakes
                  creates long-term improvement that random trading never can.
                </p>

                <p>
                  StockTally combines journaling, live tracking, watchlists, and
                  educational content into one focused platform.
                </p>
              </div>

              {/* Improvements */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {improvements.map((item) => (
                  <div
                    key={item}
                    className="st-badge-green justify-center py-2 text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/blog" className="st-btn-ghost px-6 py-3 text-sm">
                Read Trading Articles
              </Link>

              <Link to="/signup" className="st-btn-green px-6 py-3 text-sm">
                Start Journaling →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Educational Text */}
        <div className="max-w-3xl mx-auto text-center mt-14">
          <p className="text-text-muted text-sm leading-relaxed">
            Many professional traders maintain detailed trading journals because
            consistent review and self-analysis are essential for long-term
            performance improvement in financial markets.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyJournalingSection;
