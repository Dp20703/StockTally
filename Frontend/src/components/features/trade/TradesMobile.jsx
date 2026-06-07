import TradeMobileCard from "./TradeMobileCard";

export function TradesMobile({ trades }) {
  return (
    <div className="flex flex-col gap-3">
      {trades.map((trade) => (
        <TradeMobileCard key={trade._id} trade={trade} />
      ))}
    </div>
  );
}
