import { useState } from "react";
import { Link } from "react-router-dom";

/* ── Blog Data ───────────────────────────────────────────── */
const blogs = [
  {
    id: 1,
    slug: "why-every-trader-needs-a-trade-journal",
    category: "Journaling",
    categoryColor: "green",
    readTime: "4 min read",
    date: "Jan 12, 2025",
    title: "Why Every Trader Needs a Trade Journal",
    excerpt:
      "Most traders focus on entries and exits but ignore the most powerful edge available — reviewing their own trades. A journal turns random results into repeatable patterns.",
    tags: ["Journaling", "Discipline", "Mindset"],
  },
  {
    id: 2,
    slug: "understanding-unrealized-profit-and-loss",
    category: "Education",
    categoryColor: "blue",
    readTime: "5 min read",
    date: "Jan 19, 2025",
    title: "Understanding Unrealized Profit & Loss",
    excerpt:
      "Your P&L means nothing until you close the trade. Here's why unrealized gains can be misleading and how to use them as a decision-making tool rather than a feel-good number.",
    tags: ["P&L", "Risk Management", "Education"],
  },
  {
    id: 3,
    slug: "how-to-build-a-watchlist-that-works",
    category: "Strategy",
    categoryColor: "amber",
    readTime: "6 min read",
    date: "Jan 26, 2025",
    title: "How to Build a Watchlist That Actually Works",
    excerpt:
      "A 200-stock watchlist is noise. A 10-stock watchlist is signal. Learn how to filter, categorize, and monitor stocks without getting overwhelmed by information overload.",
    tags: ["Watchlist", "Strategy", "Focus"],
  },
  {
    id: 4,
    slug: "technical-analysis-basics-for-beginners",
    category: "Education",
    categoryColor: "blue",
    readTime: "8 min read",
    date: "Feb 2, 2025",
    title: "Technical Analysis Basics Every Trader Should Know",
    excerpt:
      "Support, resistance, volume, and candlestick patterns — these four concepts form the foundation of technical analysis. Master them before adding indicators.",
    tags: ["Technical Analysis", "Charts", "Beginners"],
  },
  {
    id: 5,
    slug: "position-sizing-the-most-underrated-skill",
    category: "Risk Management",
    categoryColor: "red",
    readTime: "5 min read",
    date: "Feb 9, 2025",
    title: "Position Sizing: The Most Underrated Trading Skill",
    excerpt:
      "You can be right 40% of the time and still be profitable — if your position sizing is correct. This is the math that separates consistently profitable traders from the rest.",
    tags: ["Position Sizing", "Risk", "Math"],
  },
  {
    id: 6,
    slug: "how-to-read-a-stock-chart",
    category: "Education",
    categoryColor: "blue",
    readTime: "7 min read",
    date: "Feb 16, 2025",
    title: "How to Read a Stock Chart Like a Pro",
    excerpt:
      "Candlestick charts carry more information than most traders extract from them. Learn to identify trends, reversals, and high-probability setups using price action alone.",
    tags: ["Charts", "Candlesticks", "Price Action"],
  },
  {
    id: 7,
    slug: "common-trading-mistakes-to-avoid",
    category: "Mindset",
    categoryColor: "amber",
    readTime: "6 min read",
    date: "Feb 23, 2025",
    title: "7 Common Trading Mistakes (And How to Avoid Them)",
    excerpt:
      "From revenge trading to ignoring stop losses — these seven mistakes are responsible for the majority of trading losses. Identifying them in your journal is the first step to eliminating them.",
    tags: ["Mistakes", "Psychology", "Improvement"],
  },
  {
    id: 8,
    slug: "swing-trading-vs-intraday-which-is-right-for-you",
    category: "Strategy",
    categoryColor: "green",
    readTime: "6 min read",
    date: "Mar 2, 2025",
    title: "Swing Trading vs Intraday: Which Is Right for You?",
    excerpt:
      "Both styles can be profitable, but they require very different skill sets, time commitments, and psychological temperaments. Here's how to pick the right one for your life.",
    tags: ["Swing Trading", "Intraday", "Style"],
  },
  {
    id: 9,
    slug: "how-to-use-stop-loss-effectively",
    category: "Risk Management",
    categoryColor: "red",
    readTime: "5 min read",
    date: "Mar 9, 2025",
    title: "How to Use Stop Loss Effectively Without Getting Stopped Out",
    excerpt:
      "Placing stops too tight gets you shaken out of good trades. Too wide, and you blow up your account. Here is the framework for placing stops where they actually make sense.",
    tags: ["Stop Loss", "Risk", "Execution"],
  },
  {
    id: 10,
    slug: "using-stocktally-to-improve-your-trading",
    category: "StockTally",
    categoryColor: "green",
    readTime: "4 min read",
    date: "Mar 16, 2025",
    title: "Using StockTally to Systematically Improve Your Trading",
    excerpt:
      "Your trading journal is only as useful as the time you spend reviewing it. Here's a simple weekly review framework using StockTally to identify your edge and eliminate your weaknesses.",
    tags: ["StockTally", "Review", "Improvement"],
  },
];

const categories = [
  "All",
  "Education",
  "Strategy",
  "Risk Management",
  "Mindset",
  "Journaling",
  "StockTally",
];

const badgeColors = {
  green: "st-badge-green",
  blue: "st-badge-blue",
  amber: "st-badge-amber",
  red: "st-badge-red",
};

const dotColors = {
  green: "bg-green-400",
  blue: "bg-blue-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
};

/* ── Blog Page ───────────────────────────────────────────── */
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogs.filter((b) => {
    const matchesCategory =
      activeCategory === "All" || b.category === activeCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = blogs[0];
  const rest = filtered.filter((b) => b.id !== 1);

  return (
    <main className="st-page">
      
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative px-4 pt-16 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(78,222,128,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(78,222,128,0.03) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="st-badge-green mb-5 inline-block">Blog</span>
          <h1
            className="text-text-primary font-semibold mb-4 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Trading Insights & <span className="text-green-400">Education</span>
          </h1>
          <p className="text-text-muted text-md max-w-lg mx-auto leading-relaxed mb-8">
            Practical guides on trading strategy, risk management, journaling,
            and using StockTally to sharpen your edge.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="st-input pl-9 pr-4"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURED ──────────────────────────────────────── */}
      {activeCategory === "All" && !search && (
        <section className="max-w-5xl mx-auto px-4 mb-10">
          <Link
            to={`/blog/${featured.slug}`}
            className="st-card p-7 flex flex-col sm:flex-row gap-6 group hover:border-green-border transition-colors duration-normal block"
          >
            {/* Featured label */}
            <div className="flex flex-col justify-between flex-1 gap-5">
              <div className="flex items-center gap-3">
                <span className="st-badge-green">Featured</span>
                <span className="text-text-muted text-xs">
                  {featured.readTime}
                </span>
                <span className="text-text-muted text-xs">·</span>
                <span className="text-text-muted text-xs">{featured.date}</span>
              </div>

              <div>
                <h2
                  className="text-text-primary font-semibold mb-3 group-hover:text-green-400 transition-colors duration-normal leading-snug"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
                >
                  {featured.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {featured.tags.map((tag) => (
                  <span key={tag} className="st-badge-ghost">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                Read article
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-fast" />
              </div>
            </div>

            {/* Decorative side */}
            <div
              className="hidden sm:flex w-48 shrink-0 rounded-xl items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #14291f 0%, #0d1117 100%)",
                border: "1px solid #166534",
              }}
            >
              <div className="text-center p-6">
                <i className="ri-book-open-line text-green-400 text-4xl mb-3 block" />
                <p className="text-green-400 text-xs uppercase tracking-widest font-medium">
                  Must Read
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── CATEGORY FILTER ───────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`st-badge cursor-pointer transition-all duration-normal ${
                activeCategory === cat
                  ? "st-badge-green"
                  : "st-badge-ghost hover:border-green-border hover:text-green-400"
              }`}
              style={{ padding: "6px 14px" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── BLOG GRID ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        {filtered.length === 0 ? (
          <div className="st-empty py-20">
            <i className="ri-search-line text-3xl block mb-3" />
            No articles found for "{search}"
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(search || activeCategory !== "All" ? filtered : rest).map(
              (blog) => (
                <Link
                  to={`/blog/${blog.slug}`}
                  key={blog.id}
                  className="st-card p-5 flex flex-col gap-4 group hover:border-bg-overlay transition-all duration-normal"
                  style={{ transition: "border-color 150ms, background 150ms" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#111827")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                >
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <span className={badgeColors[blog.categoryColor]}>
                      {blog.category}
                    </span>
                    <span className="text-text-muted text-xs">
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-text-primary font-medium text-md leading-snug group-hover:text-green-400 transition-colors duration-normal">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-text-muted text-sm leading-relaxed flex-1 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="st-badge-ghost"
                        style={{ padding: "2px 8px", fontSize: 10 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-bg-border">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${dotColors[blog.categoryColor]}`}
                      />
                      <span className="text-text-muted text-xs">
                        {blog.date}
                      </span>
                    </div>
                    <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                      Read
                      <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform duration-fast" />
                    </span>
                  </div>
                </Link>
              ),
            )}
          </div>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto st-card p-8 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.05) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <span className="st-badge-green mb-4 inline-block">StockTally</span>
            <h2
              className="text-text-primary font-semibold mb-3"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
            >
              Put these lessons to work
            </h2>
            <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              Track your trades, monitor live P&L, and build your edge —
              completely free.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/trade/dashboard"
                className="st-btn-ghost px-6 py-2.5 text-sm"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
