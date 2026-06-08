import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function CTASection() {
  const { user } = useAuth();
  return !user ? (
    /* ── NEW USER CTA ───────────────────────── */
    <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-2xl mx-auto st-card p-6 sm:p-8 lg:p-10 text-center relative overflow-hidden rounded-2xl">
        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px] sm:text-xs uppercase tracking-widest font-medium">
              Free • No Risk
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-text-primary font-semibold mb-3 sm:mb-4 text-lg sm:text-2xl lg:text-3xl leading-snug">
            Stop guessing. Start tracking your trades.
          </h2>

          {/* Text */}
          <p className="text-text-muted text-xs sm:text-sm mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
            Log trades, track real-time P&L, and build a disciplined trading
            system — all in one place.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to="/signup"
              className="st-btn-green w-full sm:w-auto px-6 sm:px-10 py-3 text-sm sm:text-md shadow-md hover:scale-[1.03] transition"
            >
              Start Tracking Free →
            </Link>

            <Link
              to="/login"
              className="st-btn-ghost w-full sm:w-auto px-6 sm:px-10 py-3 text-sm sm:text-md"
            >
              I Already Have an Account
            </Link>
          </div>

          <p className="text-text-muted text-[10px] sm:text-xs mt-4 sm:mt-5">
            Takes 30 seconds • No credit card • Free forever
          </p>
        </div>
      </div>
    </section>
  ) : (
    /* ── EXISTING USER CTA ──────────────────── */
    <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      <div className="max-w-xl mx-auto text-center st-card p-6 sm:p-8 rounded-2xl">
        {/* Badge */}
        <span className="st-badge-green mb-3 sm:mb-4 inline-block text-xs sm:text-sm">
          Welcome Back 👋
        </span>

        {/* Heading */}
        <h2 className="text-text-primary font-semibold mb-2 sm:mb-3 text-base sm:text-xl lg:text-2xl">
          Ready to improve your trading today?
        </h2>

        {/* Text */}
        <p className="text-text-muted text-xs sm:text-sm mb-5 sm:mb-6 max-w-sm mx-auto leading-relaxed">
          Track trades, analyze performance, and grow your edge — consistently.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/trade/dashboard"
            className="st-btn-green w-full sm:w-auto px-5 sm:px-6 py-2.5 text-sm shadow-sm"
          >
            Continue Trading
          </Link>

          <Link
            to="/trade/watchlist"
            className="st-btn-ghost w-full sm:w-auto px-5 sm:px-6 py-2.5 text-sm"
          >
            Add New Watchlist
          </Link>
        </div>
      </div>
    </section>
  );
}
