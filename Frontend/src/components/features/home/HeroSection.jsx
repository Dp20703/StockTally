import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative px-4 pt-20 pb-24 overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(78,222,128,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(78,222,128,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 st-badge-green animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Trading Education + Performance Tracking
        </div>

        <h1
          className="text-text-primary font-semibold leading-tight"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
        >
          Trade Smarter With
          <br />
          <span className="text-green-400">
            Structured Journaling & Market Education
          </span>
        </h1>

        <p
          className="text-text-muted max-w-2xl mx-auto leading-relaxed"
          style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
        >
          Improve your trading discipline through structured journaling,
          performance tracking, market psychology, and trading education
          designed for retail traders.
        </p>

        <div className="flex gap-3 flex-wrap justify-center mt-2">
          <Link to="/signup" className="st-btn-green px-8 py-3 text-md">
            Start Your Trading Journal →
          </Link>

          <Link to="/blog" className="st-btn-ghost px-8 py-3 text-md">
            Explore Trading Articles
          </Link>
        </div>

        <p className="text-text-muted text-xs mt-1">
          Built for traders who want consistency, discipline, and measurable
          improvement.
        </p>
      </div>
    </section>
  );
}
