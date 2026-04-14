/* ── Input ──────────────────────────────────────────────── */
export const Input = ({ label, className = "", ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="st-label">{label}</label>}
    <input className={`st-input ${className}`} {...props} />
  </div>
);
