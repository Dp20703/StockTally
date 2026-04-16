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
    <main className="st-page flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-5 bg-[#0d1117] px-14 py-12 rounded-2xl">
        {/* Bars */}
        <div className="flex items-end gap-[5px] h-[44px]">
          {barColors.map((color, i) => (
            <div
              key={i}
              className="st-bar animate-bar-pulse"
              style={{
                background: color,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Brand */}
        <div className="flex items-baseline gap-[2px]">
          <span className="text-[20px] font-medium text-green-50">
            StockTally
          </span>
          <span className="w-[2px] h-[16px] bg-green-400 rounded-sm animate-blink ml-[1px]" />
        </div>

        {/* Status */}
        <span className="text-[12px] text-green-400 tracking-[0.1em] uppercase animate-pulse">
          Fetching market data
        </span>
      </div>
    </main>
  );
};
