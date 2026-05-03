import { Link } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { BarLoader } from "components/ui";
import CTASection from "components/common/CTASection";

/* ── Static Data ─────────────────────────────────────────── */
const stats = [
  { value: "10K+", label: "Trades Logged" },
  { value: "₹0", label: "Cost Forever" },
  { value: "Real-time", label: "Live P&L" },
  { value: "100%", label: "Private & Secure" },
];

const problems = [
  {
    icon: "ri-file-list-3-line",
    title: "Scattered trade records",
    desc: "You track trades across Excel, WhatsApp notes, and memory. After a month you have no idea what worked.",
  },
  {
    icon: "ri-emotion-unhappy-line",
    title: "No idea why you're losing",
    desc: "You know you're losing money but can't pinpoint which setups, times, or stocks are bleeding you dry.",
  },
  {
    icon: "ri-eye-off-line",
    title: "Flying blind on open positions",
    desc: "Your open trades are spread across a broker app with no unified view of your actual P&L right now.",
  },
];

const features = [
  {
    icon: "ri-book-open-line",
    color: "green",
    title: "Trade Journal",
    desc: "Log every trade with stock name, symbol, buy/sell price, quantity, date and type. Build a complete history of every position you've ever held.",
    tag: "Core Feature",
  },
  {
    icon: "ri-line-chart-line",
    color: "blue",
    title: "Live Unrealized P&L",
    desc: "See your floating profit and loss update in real-time against current market prices — for every open position, all at once.",
    tag: "Real-time",
  },
  {
    icon: "ri-eye-line",
    color: "amber",
    title: "Smart Watchlists",
    desc: "Create themed watchlists — Breakout Candidates, Sector Leaders, Earnings Watch. Up to 10 focused stocks per list.",
    tag: "Watchlist",
  },
  {
    icon: "ri-bar-chart-2-line",
    color: "green",
    title: "TradingView Charts",
    desc: "Full TradingView chart integration — draw levels, apply indicators, switch timeframes. Professional analysis without leaving the platform.",
    tag: "Charts",
  },
  {
    icon: "ri-newspaper-line",
    color: "blue",
    title: "Market News",
    desc: "Top financial stories curated alongside your portfolio. Stay informed about market-moving news without opening another tab.",
    tag: "News",
  },
  {
    icon: "ri-shield-check-line",
    color: "amber",
    title: "Open & Closed Trades",
    desc: "Separate views for open and closed positions. Your realized P&L history is the most honest record of your actual performance.",
    tag: "Analytics",
  },
];

const steps = [
  {
    n: "01",
    title: "Create your free account",
    desc: "Sign up in 30 seconds. No credit card, no subscription, no catch. StockTally is completely free.",
  },
  {
    n: "02",
    title: "Log your trades",
    desc: "Enter stock name, symbol, buy price, quantity, and date. Takes 20 seconds per trade.",
  },
  {
    n: "03",
    title: "Monitor live P&L",
    desc: "Your open positions show live unrealized profit and loss against real-time market prices.",
  },
  {
    n: "04",
    title: "Review and improve",
    desc: "Weekly review of closed trades reveals your edge — and your costly habits. This is where real improvement happens.",
  },
];

const testimonials = [
  {
    quote:
      "I finally understand which setups are actually profitable for me. The weekly review changed how I trade.",
    name: "Rahul M.",
    role: "Swing Trader, Mumbai",
    profit: "+₹42,000 this quarter",
    color: "green",
  },
  {
    quote:
      "I used to track trades in Excel. StockTally shows me live P&L on open positions — I can't go back.",
    name: "Priya S.",
    role: "Intraday Trader, Bangalore",
    profit: "3x better trade discipline",
    color: "blue",
  },
  {
    quote:
      "The watchlist feature keeps me focused on 10 stocks instead of 200. My win rate improved significantly.",
    name: "Arjun K.",
    role: "Part-time Trader, Pune",
    profit: "Win rate up from 34% → 51%",
    color: "amber",
  },
];

const faqs = [
  {
    q: "Is StockTally really free?",
    a: "Yes — completely free, forever. No subscription tiers, no feature locks, no hidden fees. StockTally is supported by advertising.",
  },
  {
    q: "Which stocks and exchanges does StockTally support?",
    a: "StockTally works with any stock you trade — NSE, BSE, or any other exchange. You manually enter the stock symbol, so it works with any market worldwide.",
  },
  {
    q: "Does StockTally connect to my broker?",
    a: "No — StockTally is a manual trade journal, not a broker integration. You enter your own trades, which means your data stays private and is not shared with any broker.",
  },
  {
    q: "How is my data protected?",
    a: "Your trade data is stored securely with encrypted passwords and JWT authentication. We never sell your data to third parties.",
  },
  {
    q: "Can I use StockTally for intraday and swing trading?",
    a: "Yes — both work perfectly. Log intraday trades with entry and exit on the same day, or keep swing trades open for days and monitor live P&L.",
  },
];

/* ── Color map ───────────────────────────────────────────── */
const colorMap = {
  green: {
    badge: "st-badge-green",
    icon: "text-green-400",
    bg: "bg-green-900",
    border: "border-green-border",
  },
  blue: {
    badge: "st-badge-blue",
    icon: "text-blue-400",
    bg: "bg-blue-900",
    border: "border-blue-border",
  },
  amber: {
    badge: "st-badge-amber",
    icon: "text-amber-400",
    bg: "bg-amber-900",
    border: "border-amber-border",
  },
};

/* ── Ticker animation data ───────────────────────────────── */
const tickers = [
  { sym: "RELIANCE", val: "₹2,847.50", chg: "+1.24%", up: true },
  { sym: "TCS", val: "₹3,412.00", chg: "+0.87%", up: true },
  { sym: "INFY", val: "₹1,589.75", chg: "-0.43%", up: false },
  { sym: "HDFC", val: "₹1,723.25", chg: "+2.11%", up: true },
  { sym: "WIPRO", val: "₹456.80", chg: "-1.02%", up: false },
  { sym: "BAJAJ", val: "₹7,234.00", chg: "+0.56%", up: true },
  { sym: "ITC", val: "₹478.60", chg: "+0.33%", up: true },
  { sym: "NIFTY50", val: "₹22,419", chg: "+0.91%", up: true },
];

/* ── FAQ Item ────────────────────────────────────────────── */
const FaqItem = ({ q, a }) => (
  <details className="st-card group" style={{ cursor: "pointer" }}>
    <summary className="flex items-center justify-between px-5 py-4 list-none cursor-pointer select-none">
      <span className="text-text-primary font-medium text-md pr-4">{q}</span>
      <i className="ri-add-line text-green-400 text-lg shrink-0 group-open:hidden" />
      <i className="ri-subtract-line text-green-400 text-lg shrink-0 hidden group-open:block" />
    </summary>
    <div className="px-5 pb-4 border-t border-bg-border">
      <p className="text-text-muted text-sm leading-relaxed pt-3">{a}</p>
    </div>
  </details>
);

/* ── Home Page ───────────────────────────────────────────── */
export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="st-loader-screen">
        <BarLoader />
      </div>
    );
  }

  return (
    <main className="st-page overflow-x-hidden">

      {/* ── TICKER TAPE ─────────────────────────────────────── */}
      <div className="border-b border-bg-border bg-bg-surface overflow-hidden py-2">
        <style>{`
          @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .ticker-track { display: flex; animation: ticker 30s linear infinite; width: max-content; }
          .ticker-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="ticker-track">
          {[...tickers, ...tickers].map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 border-r border-bg-border shrink-0"
            >
              <span className="text-text-primary font-medium text-xs">
                {t.sym}
              </span>
              <span className="text-text-secondary text-xs font-mono">
                {t.val}
              </span>
              <span
                className={`text-xs font-medium font-mono ${t.up ? "text-green-400" : "text-red-400"}`}
              >
                {t.chg}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative px-4 pt-20 pb-24 overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(78,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(78,222,128,0.04) 1px, transparent 1px)`,
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

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {user ? (
            /* ── Logged in hero ── */
            <div className="flex flex-col items-center gap-6">
              <span className="st-badge-green animate-fade-in">
                Welcome back
              </span>
              <h1
                className="text-text-primary font-semibold leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Good to see you,{" "}
                <span className="text-green-400">
                  {user?.fullName?.firstName || "Trader"}
                </span>
              </h1>
              <p className="text-text-muted text-lg max-w-lg leading-relaxed">
                Your portfolio is waiting. Log today's trades, check your live
                P&L, and review your watchlists.
              </p>
              <div className="flex gap-3 flex-wrap justify-center mt-2">
                <Link
                  to="/trade/dashboard"
                  className="st-btn-green px-8 py-3 text-md"
                >
                  Open Dashboard →
                </Link>
                <Link
                  to="/trade/watchlist"
                  className="st-btn-ghost px-8 py-3 text-md"
                >
                  View Watchlist
                </Link>
              </div>
              {/* Quick stats for logged in user */}
              <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-lg">
                {[
                  {
                    label: "Open Trades",
                    icon: "ri-funds-line",
                    color: "green",
                  },
                  { label: "Watchlists", icon: "ri-eye-line", color: "blue" },
                  {
                    label: "Charts",
                    icon: "ri-bar-chart-2-line",
                    color: "amber",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="st-card p-4 text-center flex flex-col items-center gap-2"
                  >
                    <i
                      className={`${item.icon} text-2xl ${colorMap[item.color].icon}`}
                    />
                    <span className="text-text-muted text-xs">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ── New user hero ── */
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 st-badge-green animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Free for Indian Stock Market Traders
              </div>

              <h1
                className="text-text-primary font-semibold leading-tight"
                style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
              >
                The Trading Journal
                <br />
                <span className="text-green-400">
                  Built for Serious Traders
                </span>
              </h1>

              <p
                className="text-text-muted max-w-2xl mx-auto leading-relaxed"
                style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
              >
                StockTally helps you log every trade, monitor live unrealized
                P&L, manage watchlists, and review your performance — so you can
                stop guessing and start improving.
              </p>

              <div className="flex gap-3 flex-wrap justify-center mt-2">
                <Link to="/signup" className="st-btn-green px-8 py-3 text-md">
                  Start Tracking Free →
                </Link>
                <a href="#features" className="st-btn-ghost px-8 py-3 text-md">
                  See Features
                </a>
              </div>

              <p className="text-text-muted text-xs mt-1">
                No credit card · No subscription · Always free
              </p>

              {/* Mock dashboard preview */}
              <div className="mt-10 w-full max-w-3xl st-card p-4 sm:p-6 text-left">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-muted text-xs uppercase tracking-wider">
                    Live Portfolio Preview
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                </div>
                {/* Mock trades */}
                {[
                  {
                    sym: "RELIANCE",
                    name: "Reliance Industries",
                    buy: "₹2,690",
                    cur: "₹2,847",
                    qty: 10,
                    pnl: "+₹1,570",
                    up: true,
                  },
                  {
                    sym: "TCS",
                    name: "Tata Consultancy",
                    buy: "₹3,280",
                    cur: "₹3,412",
                    qty: 5,
                    pnl: "+₹660",
                    up: true,
                  },
                  {
                    sym: "INFY",
                    name: "Infosys Ltd.",
                    buy: "₹1,620",
                    cur: "₹1,589",
                    qty: 15,
                    pnl: "-₹465",
                    up: false,
                  },
                ].map((t) => (
                  <div
                    key={t.sym}
                    className="flex items-center justify-between py-3 border-b border-bg-border last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${t.up ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"}`}
                      >
                        {t.sym.slice(0, 3)}
                      </div>
                      <div>
                        <p className="text-text-primary text-sm font-medium">
                          {t.sym}
                        </p>
                        <p className="text-text-muted text-xs">{t.name}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex gap-6 text-right">
                      <div>
                        <p className="text-text-muted text-xs">Buy</p>
                        <p className="text-text-secondary text-sm font-mono">
                          {t.buy}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted text-xs">Current</p>
                        <p className="text-text-secondary text-sm font-mono">
                          {t.cur}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted text-xs">Qty</p>
                        <p className="text-text-secondary text-sm">{t.qty}</p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-mono font-medium ${t.up ? "text-green-400" : "text-red-400"}`}
                    >
                      {t.pnl}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3">
                  <span className="text-text-muted text-xs">
                    3 open positions
                  </span>
                  <span className="text-green-400 text-sm font-mono font-medium">
                    Net +₹1,765
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section className="px-4 py-12 border-y border-bg-border bg-bg-surface">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-2">
              <p
                className="text-green-400 font-semibold mb-1"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
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

      {/* ── PROBLEM SECTION ─────────────────────────────────── */}
      {!user && (
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="st-badge-red mb-4 inline-block">
                Sound Familiar?
              </span>
              <h2
                className="text-text-primary font-semibold"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                Trading without a system is just gambling
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="st-card p-6 border-l-2 border-l-red-400"
                  style={{ borderRadius: "0 12px 12px 0" }}
                >
                  <i className={`${p.icon} text-red-400 text-2xl mb-3 block`} />
                  <h3 className="text-text-primary font-medium text-md mb-2">
                    {p.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-text-muted text-md mb-4">
                StockTally solves all three — for free.
              </p>
              <Link to="/signup" className="st-btn-green px-8 py-3 text-md">
                Fix This Today →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section
        id="features"
        className="px-4 py-20 bg-bg-surface border-y border-bg-border"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="st-badge-ghost mb-4 inline-block">Features</span>
            <h2
              className="text-text-primary font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              Everything a stock trader needs
            </h2>
            <p className="text-text-muted text-md mt-3 max-w-lg mx-auto">
              Built specifically for Indian retail traders who want to trade
              with more discipline and clarity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-bg-raised border border-bg-border rounded-xl p-6 flex flex-col gap-3 group cursor-default"
                style={{ transition: "border-color 150ms, background 150ms" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#166534";
                  e.currentTarget.style.background = "#0d1117";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "";
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[f.color].bg} ${colorMap[f.color].border}`}
                  >
                    <i
                      className={`${f.icon} text-lg ${colorMap[f.color].icon}`}
                    />
                  </div>
                  <span className={colorMap[f.color].badge}>{f.tag}</span>
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

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section id="how-it-works" className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="st-badge-ghost mb-4 inline-block">
              How It Works
            </span>
            <h2
              className="text-text-primary font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              Up and running in 2 minutes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((s, i) => (
              <div key={s.n} className="st-card p-6 flex gap-5 items-start">
                <span className="font-mono text-green-400 font-bold text-2xl shrink-0 leading-none mt-0.5">
                  {s.n}
                </span>
                <div className="w-px self-stretch bg-bg-border shrink-0" />
                <div>
                  <h3 className="text-text-primary font-medium text-lg mb-2">
                    {s.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="px-4 py-20 bg-bg-surface border-y border-bg-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="st-badge-ghost mb-4 inline-block">
              Traders Love It
            </span>
            <h2
              className="text-text-primary font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              Real results from real traders
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="st-card p-6 flex flex-col gap-4">
                <i className="ri-double-quotes-l text-2xl text-text-muted" />
                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  "{t.quote}"
                </p>
                <div
                  className={`st-badge self-start ${colorMap[t.color].badge}`}
                >
                  {t.profit}
                </div>
                <div className="border-t border-bg-border pt-3">
                  <p className="text-text-primary font-medium text-sm">
                    {t.name}
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="st-badge-ghost mb-4 inline-block">FAQ</span>
            <h2
              className="text-text-primary font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              Common questions
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <CTASection />

    </main>
  );
}
