import { Link } from "react-router-dom";

/* ── Static data ─────────────────────────────────────────── */
const stats = [
  { value: "10K+", label: "Trades Tracked" },
  { value: "99.9%", label: "Uptime" },
  { value: "Real-time", label: "Price Updates" },
  { value: "Free", label: "Always" },
];

const features = [
  {
    icon: "ri-line-chart-line",
    color: "green",
    title: "Trade Journal",
    desc: "Log every buy and sell with price, date, quantity, and type. Keep a clean history of all your positions — open and closed.",
  },
  {
    icon: "ri-funds-line",
    color: "blue",
    title: "Live P&L Tracking",
    desc: "See your unrealized profit and loss update in real-time using live market prices. Know exactly where you stand at any moment.",
  },
  {
    icon: "ri-eye-line",
    color: "amber",
    title: "Watchlist",
    desc: "Build multiple watchlists for different strategies. Monitor stock prices in one clean view without switching between tabs.",
  },
  {
    icon: "ri-bar-chart-2-line",
    color: "green",
    title: "TradingView Charts",
    desc: "Full-featured charts powered by TradingView. Analyze price action, draw levels, and apply indicators — all in one place.",
  },
  {
    icon: "ri-newspaper-line",
    color: "blue",
    title: "Top Stories",
    desc: "Stay on top of market-moving news. Financial headlines curated and displayed right inside your dashboard.",
  },
  {
    icon: "ri-pie-chart-line",
    color: "amber",
    title: "Portfolio Analytics",
    desc: "Understand your portfolio at a glance. Track final profits, position sizes, long vs short split, and more.",
  },
];

const howItHelps = [
  {
    step: "01",
    title: "Log your trades instantly",
    desc: "Enter stock name, symbol, price, quantity, type, and date. StockTally stores everything and calculates your P&L automatically.",
  },
  {
    step: "02",
    title: "Monitor live prices",
    desc: "Every open position shows you the current market price and your unrealized profit or loss — updated live.",
  },
  {
    step: "03",
    title: "Review and improve",
    desc: "Go through closed trades, study what worked, and use that data to sharpen your next entry.",
  },
];

const techStack = [
  { name: "MongoDB", role: "Database", color: "green" },
  { name: "Express", role: "Backend API", color: "amber" },
  { name: "React", role: "Frontend", color: "blue" },
  { name: "Node.js", role: "Runtime", color: "green" },
  { name: "Tailwind", role: "Styling", color: "blue" },
  { name: "TradingView", role: "Charts", color: "amber" },
];

/* ── About Page ──────────────────────────────────────────── */
const AboutPage = () => {
  return (
    <main className="st-page overflow-x-hidden">
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(78,222,128,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(78,222,128,0.04) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
          }}
        />

        <span className="st-badge-green mb-6 animate-fade-in">
          About StockTally
        </span>

        <h1
          className="text-text-primary font-semibold leading-tight mb-6 animate-fade-in"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            animationDelay: "0.05s",
          }}
        >
          Your Personal
          <br />
          <span className="text-green-400">Trading Journal</span>
        </h1>

        <p
          className="text-text-muted max-w-xl mx-auto text-md leading-relaxed mb-10 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          StockTally helps traders track every position, monitor live P&L,
          manage watchlists, and review performance — all in one clean,
          distraction-free dashboard.
        </p>

        <div
          className="flex gap-3 flex-wrap justify-center animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          <Link to="/signup" className="st-btn-green px-6 py-2.5 text-md">
            Get Started Free
          </Link>
          <Link to="/login" className="st-btn-ghost px-6 py-2.5 text-md">
            Sign In
          </Link>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="st-card p-5 text-center hover:border-green-border transition-colors duration-normal"
            >
              <p
                className="text-green-400 font-semibold mb-1"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
              >
                {s.value}
              </p>
              <p className="text-text-muted text-xs uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="st-divider max-w-5xl mx-auto mb-16" />

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="st-badge-ghost mb-4 inline-block">Features</span>
            <h2
              className="text-text-primary font-medium"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            >
              Everything a trader needs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="st-card p-6 flex flex-col gap-3 group hover:border-bg-overlay transition-all duration-normal cursor-default"
                style={{ transition: "border-color 150ms, background 150ms" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#111827")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border st-badge-${f.color}`}
                >
                  <i className={`${f.icon} text-lg`} />
                </div>
                <h3 className="text-text-primary font-medium text-lg">
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

      <div className="st-divider max-w-5xl mx-auto mb-16" />

      {/* ── HOW IT HELPS ────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="st-badge-ghost mb-4 inline-block">
              How it works
            </span>
            <h2
              className="text-text-primary font-medium"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            >
              Simple workflow, powerful results
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {howItHelps.map((h, i) => (
              <div
                key={h.step}
                className="st-card p-6 flex flex-col sm:flex-row items-start gap-5"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="font-mono text-green-400 font-semibold text-xl shrink-0 mt-0.5">
                  {h.step}
                </span>
                <div className="w-px self-stretch bg-bg-border hidden sm:block shrink-0" />
                <div>
                  <h3 className="text-text-primary font-medium text-lg mb-1">
                    {h.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="st-divider max-w-5xl mx-auto mb-16" />

      {/* ── TECH STACK ──────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="st-badge-ghost mb-4 inline-block">Built with</span>
            <h2
              className="text-text-primary font-medium"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            >
              MERN Stack — modern & reliable
            </h2>
            <p className="text-text-muted text-sm mt-3 max-w-md mx-auto">
              StockTally is built on the MERN stack — a battle-tested
              combination of technologies that powers scalable, real-time web
              applications.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="st-card p-4 flex items-center gap-3 hover:border-bg-overlay transition-colors duration-normal"
              >
                <div
                  className={`w-2 h-8 rounded-full ${
                    t.color === "green"
                      ? "bg-green-400"
                      : t.color === "blue"
                        ? "bg-blue-400"
                        : "bg-amber-400"
                  }`}
                />
                <div>
                  <p className="text-text-primary font-medium text-md">
                    {t.name}
                  </p>
                  <p className="text-text-muted text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="st-card p-10 text-center relative overflow-hidden">
            {/* Subtle glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs uppercase tracking-widest font-medium">
                  Live & Free
                </span>
              </div>

              <h2
                className="text-text-primary font-semibold mb-4"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
              >
                Start tracking your trades today
              </h2>
              <p className="text-text-muted text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                No credit card. No limits. Just a clean tool built by a trader,
                for traders.
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/signup" className="st-btn-green px-8 py-2.5 text-md">
                  Create Free Account
                </Link>
                <Link
                  to="/trade/dashboard"
                  className="st-btn-ghost px-8 py-2.5 text-md"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
