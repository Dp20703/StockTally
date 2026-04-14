/* ── Bar Loader (StockTally branded) ────────────────────── */
export const BarLoader = () => {
  const barColors = [
    "#15803d",
    "#16a34a",
    "#22c55e",
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
  ];
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-end gap-1.5" style={{ height: 44 }}>
        {barColors.map((color, i) => (
          <div
            key={i}
            className="st-bar"
            style={{
              height: "100%",
              background: color,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-medium text-text-primary tracking-tight">
          StockTally
        </span>
        <span className="inline-block w-0.5 h-4 bg-green-400 rounded-sm animate-blink ml-0.5" />
      </div>
      <span className="text-xs text-green-400 tracking-widest uppercase animate-pulse">
        Fetching market data
      </span>
    </div>
  );
};
