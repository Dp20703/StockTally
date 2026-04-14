/* ── Select ─────────────────────────────────────────────── */
export const Select = ({ label, children, className = "", ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="st-label">{label}</label>}
    <select className={`st-select ${className}`} {...props}>
      {children}
    </select>
  </div>
);
