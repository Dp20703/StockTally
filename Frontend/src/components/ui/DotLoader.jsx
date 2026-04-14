/* ── Dot Loader ─────────────────────────────────────────── */
export const DotLoader = () => (
  <div className="st-dot-loader">
    {[0, 150, 300].map((delay) => (
      <div
        key={delay}
        className="st-dot"
        style={{ animation: `bounce 0.8s ease-in-out ${delay}ms infinite` }}
      />
    ))}
    <style>{`
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-6px); }
      }
    `}</style>
  </div>
);
