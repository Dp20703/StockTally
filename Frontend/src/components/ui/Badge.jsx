/* ── Badge ──────────────────────────────────────────────── */
export const Badge = ({ variant = "ghost", children, className = "" }) => {
  const variantClass =
    {
      green: "st-badge-green",
      red: "st-badge-red",
      amber: "st-badge-amber",
      blue: "st-badge-blue",
      ghost: "st-badge-ghost",
    }[variant] || "st-badge-ghost";

  return <span className={`${variantClass} ${className}`}>{children}</span>;
};
