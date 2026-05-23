const stats = [
  { value: "40+", label: "Educational Articles" },
  { value: "10K+", label: "Trades Logged" },
  { value: "Real-time", label: "Live P&L Tracking" },
  { value: "100%", label: "Private & Secure" },
];

export default function StatsSection() {
  return (
    <section className="px-4 py-14 border-y border-bg-border bg-bg-surface">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <h3
              className="text-green-400 font-semibold mb-2"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              {s.value}
            </h3>

            <p className="text-text-muted text-xs uppercase tracking-wider">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
