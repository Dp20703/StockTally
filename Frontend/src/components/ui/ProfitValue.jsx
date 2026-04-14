/* ── Profit Cell ────────────────────────────────────────── */
export const ProfitValue = ({ value }) => {
  const isPositive = value >= 0;
  return (
    <span className={isPositive ? "st-profit" : "st-loss"}>
      {isPositive ? "▲" : "▼"} ₹ {Math.abs(value)?.toFixed(2)}
    </span>
  );
};
