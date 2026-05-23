import { Link } from "react-router-dom";

const psychologyPoints = [
  {
    icon: "ri-emotion-line",
    title: "Control Emotional Decisions",
    desc: "Fear and greed cause impulsive entries, revenge trading, and poor exits. Structured review helps traders stay objective.",
  },
  {
    icon: "ri-focus-2-line",
    title: "Build Trading Discipline",
    desc: "Consistency matters more than random lucky trades. Journaling helps traders follow systems instead of emotions.",
  },
  {
    icon: "ri-search-eye-line",
    title: "Understand Your Patterns",
    desc: "Tracking setups, mistakes, and performance reveals what actually works for your trading style.",
  },
];

const TradingPsychologySection = () => {
  return (
    <section className="px-4 py-20 bg-bg-surface border-y border-bg-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="st-badge-blue mb-4 inline-block">
            Trading Psychology
          </span>

          <h2
            className="text-text-primary font-semibold leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}
          >
            Great Trading Starts With Better Psychology
          </h2>

          <p className="text-text-muted text-md mt-4 max-w-2xl mx-auto leading-relaxed">
            Most traders focus only on entries and indicators. Long-term
            consistency actually comes from discipline, emotional control, and
            structured review.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {psychologyPoints.map((point) => (
            <div key={point.title} className="st-card p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-900 border border-blue-border flex items-center justify-center mb-5">
                <i className={`${point.icon} text-blue-400 text-xl`} />
              </div>

              <h3 className="text-text-primary text-lg font-medium mb-3">
                {point.title}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-14 st-card p-8 text-center">
          <h3 className="text-text-primary text-2xl font-semibold mb-4">
            Why Professional Traders Keep Journals
          </h3>

          <p className="text-text-muted max-w-3xl mx-auto leading-relaxed text-sm">
            Professional traders review trades regularly to identify emotional
            mistakes, improve execution quality, and refine risk management.
            Journaling creates accountability and helps traders make data-driven
            decisions instead of emotional ones.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/blog" className="st-btn-ghost px-6 py-3 text-sm">
              Explore Trading Education
            </Link>

            <Link to="/signup" className="st-btn-green px-6 py-3 text-sm">
              Start Tracking Trades →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingPsychologySection;
