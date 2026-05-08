import CTASection from "components/common/CTASection";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { blogs } from "utils/blogData";

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

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;

      const matchesSearch =
        blog.title.toLowerCase().includes(normalizedSearch) ||
        blog.excerpt.toLowerCase().includes(normalizedSearch) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, normalizedSearch]);

  const featuredBlog = blogs[0];

  const blogGrid =
    search || activeCategory !== "All"
      ? filteredBlogs
      : filteredBlogs.filter((b) => b.id !== featuredBlog.id);

  return (
    <main className="st-page">
      {/* HERO */}
      <section className="relative px-4 pt-16 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(78,222,128,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(78,222,128,0.03) 1px, transparent 1px)
            `,
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
              aria-label="Search blog articles"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="st-input pl-9 pr-4"
            />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {activeCategory === "All" && !search && featuredBlog && (
        <section className="max-w-5xl mx-auto px-4 mb-10">
          <Link
            to={`/blog/${featuredBlog.slug}`}
            className="st-card p-7 flex flex-col sm:flex-row gap-6 group hover:border-green-border transition-all duration-normal hover:bg-gray-900/40 block"
          >
            <div className="flex flex-col justify-between flex-1 gap-5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="st-badge-green">Featured</span>

                <span className="text-text-muted text-xs">
                  {featuredBlog.readTime}
                </span>

                <span className="text-text-muted text-xs">·</span>

                <span className="text-text-muted text-xs">
                  {featuredBlog.date}
                </span>
              </div>

              <div>
                <h2
                  className="text-text-primary font-semibold mb-3 group-hover:text-green-400 transition-colors duration-normal leading-snug"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
                >
                  {featuredBlog.title}
                </h2>

                <p className="text-text-muted text-sm leading-relaxed">
                  {featuredBlog.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {featuredBlog.tags.map((tag) => (
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

      {/* CATEGORY FILTER */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`st-badge cursor-pointer transition-all duration-normal ${
                activeCategory === category
                  ? "st-badge-green"
                  : "st-badge-ghost hover:border-green-border hover:text-green-400"
              }`}
              style={{ padding: "6px 14px" }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        {filteredBlogs.length === 0 ? (
          <div className="st-empty py-20">
            <i className="ri-search-line text-3xl block mb-3" />
            No articles found for "{search || activeCategory}"
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogGrid.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="st-card p-5 flex flex-col gap-4 group hover:border-bg-overlay hover:bg-gray-900/40 transition-all duration-normal"
              >
                <div className="flex items-center justify-between">
                  <span className={badgeColors[blog.categoryColor]}>
                    {blog.category}
                  </span>

                  <span className="text-text-muted text-xs">
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-text-primary font-medium text-md leading-snug group-hover:text-green-400 transition-colors duration-normal">
                  {blog.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed flex-1 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex gap-1.5 flex-wrap">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="st-badge-ghost text-[10px] px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-bg-border">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${dotColors[blog.categoryColor]}`}
                    />

                    <span className="text-text-muted text-xs">{blog.date}</span>
                  </div>

                  <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                    Read
                    <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform duration-fast" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </main>
  );
};

export default BlogPage;
