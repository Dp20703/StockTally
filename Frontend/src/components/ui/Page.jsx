/* ── Page wrapper ───────────────────────────────────────── */
export const Page = ({ children, className = '' }) => (
    <main className={`st-page ${className}`}>{children}</main>
);
