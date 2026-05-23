import { Link } from "react-router-dom";

export default function EducationalIntroSection() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="st-badge-amber mb-4 inline-block">
            Trading Psychology
          </span>

          <h2
            className="text-text-primary font-semibold mb-5"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            Why Most Traders Never Improve
          </h2>

          <div className="flex flex-col gap-4 text-text-muted leading-relaxed text-md">
            <p>
              Most traders repeat the same mistakes because they never review
              their trades systematically.
            </p>

            <p>
              Emotional entries, revenge trading, poor risk management, and
              inconsistent execution slowly destroy long-term performance.
            </p>

            <p>
              StockTally helps traders build discipline through journaling,
              structured reviews, market education, and performance tracking.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap mt-8">
            <Link to="/blog" className="st-btn-green px-6 py-3">
              Learn Trading Concepts
            </Link>

            <Link to="/signup" className="st-btn-ghost px-6 py-3">
              Start Journaling
            </Link>
          </div>
        </div>

        <div className="st-card p-8 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-900 border border-red-border flex items-center justify-center shrink-0">
              <i className="ri-error-warning-line text-red-400 text-xl" />
            </div>

            <div>
              <h3 className="text-text-primary font-medium mb-2">
                Common Trading Mistakes
              </h3>

              <ul className="flex flex-col gap-2 text-sm text-text-muted leading-relaxed">
                <li>• Trading without a plan</li>
                <li>• No performance review system</li>
                <li>• Emotional decision making</li>
                <li>• Poor risk management</li>
                <li>• No trading journal</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-bg-border pt-5">
            <h3 className="text-text-primary font-medium mb-3">
              What StockTally Helps You Improve
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="st-badge-green justify-center py-2">
                Discipline
              </div>

              <div className="st-badge-blue justify-center py-2">
                Consistency
              </div>

              <div className="st-badge-amber justify-center py-2">
                Risk Control
              </div>

              <div className="st-badge-green justify-center py-2">
                Performance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
