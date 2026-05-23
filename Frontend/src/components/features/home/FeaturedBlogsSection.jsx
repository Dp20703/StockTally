import { Link } from "react-router-dom";
import { blogs } from "utils/blogData";

export default function FeaturedBlogsSection() {
  return (
    <section className="px-4 py-20 border-y border-bg-border bg-bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="st-badge-ghost mb-4 inline-block">
            Trading Education
          </span>

          <h2
            className="text-text-primary font-semibold"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            Learn Real Trading Concepts
          </h2>

          <p className="text-text-muted text-md mt-3 max-w-2xl mx-auto leading-relaxed">
            Learn support & resistance, market psychology, volume analysis,
            breakout trading, institutional activity, and risk management
            through practical educational content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.slice(0, 6).map((blog) => (
            <Link
              key={blog.slug}
              to={`/blog/${blog.slug}`}
              className="st-card p-5 flex flex-col gap-4 hover:border-green-border hover:bg-bg-raised transition-all duration-normal"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="st-badge-green">{blog.category}</span>

                <span className="text-text-muted text-xs">{blog.readTime}</span>
              </div>

              <h3 className="text-text-primary text-lg font-medium leading-snug">
                {blog.title}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed flex-1">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-bg-border">
                <span className="text-text-muted text-xs">{blog.date}</span>

                <span className="text-green-400 text-sm font-medium">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog" className="st-btn-green px-8 py-3 text-md">
            View All Trading Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
