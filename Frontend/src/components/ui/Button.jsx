/* ── Button ─────────────────────────────────────────────── */
export const Button = ({
  variant = "green",
  children,
  className = "",
  ...props
}) => {
  const variantClass =
    {
      green: "st-btn-green",
      red: "st-btn-red",
      amber: "st-btn-amber",
      ghost: "st-btn-ghost",
    }[variant] || "st-btn-green";

  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
