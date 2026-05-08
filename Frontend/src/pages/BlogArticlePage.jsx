import { useMemo } from "react";
import { Divider } from "components/ui";
import { useParams, Link } from "react-router-dom";
import { blogs } from "utils/blogData";

const badgeColors = {
  green: "st-badge-green",
  blue: "st-badge-blue",
  amber: "st-badge-amber",
  red: "st-badge-red",
};

const calloutColors = {
  green: {
    bg: "bg-green-900",
    border: "border-green-border",
    text: "text-green-400",
    icon: "ri-double-quotes-l",
  },
  blue: {
    bg: "bg-blue-900",
    border: "border-blue-border",
    text: "text-blue-400",
    icon: "ri-information-line",
  },
  amber: {
    bg: "bg-amber-900",
    border: "border-amber-border",
    text: "text-amber-400",
    icon: "ri-lightbulb-line",
  },
  red: {
    bg: "bg-red-900",
    border: "border-red-border",
    text: "text-red-400",
    icon: "ri-error-warning-line",
  },
};

const renderBlock = (block, index) => {
  switch (block.type) {
    case "intro":
      return (
        <p
          key={index}
          className="text-text-secondary text-md leading-relaxed font-light border-l-2 border-green-400 pl-4"
          style={{ fontSize: "15px", lineHeight: "1.8" }}
        >
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2
          key={index}
          className="text-text-primary font-semibold mt-2"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.25rem)" }}
        >
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p
          key={index}
          className="text-text-secondary leading-relaxed whitespace-pre-line"
          style={{ fontSize: "14px", lineHeight: "1.85" }}
        >
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul key={index} className="flex flex-col gap-2 pl-1">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-text-secondary text-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />

              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const c = calloutColors[block.color] || calloutColors.green;

      return (
        <div
          key={index}
          className={`${c.bg} border ${c.border} rounded-xl p-5 flex gap-4 items-start`}
        >
          <i className={`${c.icon} ${c.text} text-xl mt-0.5 shrink-0`} />

          <p className={`${c.text} text-sm leading-relaxed font-medium`}>
            {block.text}
          </p>
        </div>
      );
    }

    default:
      return null;
  }
};

const BlogArticlePage = () => {
  const { slug } = useParams();

  const currentIndex = useMemo(
    () => blogs.findIndex((blog) => blog.slug === slug),
    [slug],
  );

  const blog = blogs[currentIndex];

  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  const nextBlog =
    currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const relatedBlogs = useMemo(() => {
    if (!blog) return [];

    return blogs
      .filter((b) => b.category === blog.category && b.slug !== blog.slug)
      .slice(0, 2);
  }, [blog]);

  if (!blog) {
    return (
      <main className="st-page">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <i className="ri-article-line text-5xl text-text-muted" />

          <h2 className="text-text-primary text-xl font-medium">
            Article not found
          </h2>

          <Link to="/blog" className="st-btn-green">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="st-page">
      {/* HERO */}
      <section className="relative px-4 pt-12 pb-10 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(78,222,128,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(78,222,128,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-text-muted text-xs mb-6 flex-wrap">
            <Link
              to="/"
              className="hover:text-text-primary transition-colors duration-fast"
            >
              Home
            </Link>

            <i className="ri-arrow-right-s-line" />

            <Link
              to="/blog"
              className="hover:text-text-primary transition-colors duration-fast"
            >
              Blog
            </Link>

            <i className="ri-arrow-right-s-line" />

            <span className="text-text-secondary truncate max-w-xs">
              {blog.title}
            </span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span className={badgeColors[blog.categoryColor]}>
              {blog.category}
            </span>

            <span className="text-text-muted text-xs flex items-center gap-1">
              <i className="ri-time-line" />
              {blog.readTime}
            </span>

            <span className="text-text-muted text-xs flex items-center gap-1">
              <i className="ri-calendar-line" />
              {blog.date}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-text-primary font-semibold leading-tight mb-5"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
          >
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="text-text-muted text-md leading-relaxed mb-6 max-w-2xl">
            {blog.excerpt}
          </p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {blog.tags.map((tag) => (
              <span key={tag} className="st-badge-ghost">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Divider className="max-w-3xl mx-auto mb-10" />

      {/* ARTICLE */}
      <article className="max-w-3xl mx-auto px-4 pb-16">
        <div className="flex flex-col gap-7">
          {blog.content.map(renderBlock)}
        </div>
      </article>

      <Divider className="max-w-3xl mx-auto mb-10" />

      {/* RELATED */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 mb-12">
          <h3 className="text-text-primary font-medium text-lg mb-4">
            Related Articles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedBlogs.map((related) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="st-card p-5 flex flex-col gap-3 group hover:border-green-border hover:bg-gray-900/40 transition-all duration-normal"
              >
                <span
                  className={`${badgeColors[related.categoryColor]} self-start`}
                >
                  {related.category}
                </span>

                <p className="text-text-primary font-medium text-md leading-snug group-hover:text-green-400 transition-colors duration-normal">
                  {related.title}
                </p>

                <p className="text-text-muted text-xs">
                  {related.readTime} · {related.date}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <section className="max-w-3xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevBlog ? (
            <Link
              to={`/blog/${prevBlog.slug}`}
              className="st-card p-5 flex flex-col gap-2 group hover:border-bg-overlay hover:bg-gray-900/40 transition-all duration-normal"
            >
              <span className="text-text-muted text-xs flex items-center gap-1">
                <i className="ri-arrow-left-line" />
                Previous
              </span>

              <p className="text-text-primary font-medium text-md leading-snug group-hover:text-green-400 transition-colors duration-normal">
                {prevBlog.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextBlog && (
            <Link
              to={`/blog/${nextBlog.slug}`}
              className="st-card p-5 flex flex-col gap-2 text-right group hover:border-bg-overlay hover:bg-gray-900/40 transition-all duration-normal"
            >
              <span className="text-text-muted text-xs flex items-center justify-end gap-1">
                Next
                <i className="ri-arrow-right-line" />
              </span>

              <p className="text-text-primary font-medium text-md leading-snug group-hover:text-green-400 transition-colors duration-normal">
                {nextBlog.title}
              </p>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogArticlePage;
