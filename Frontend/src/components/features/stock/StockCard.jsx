export default function StockCard({ stock }) {
  return (
    <div className="flex justify-between items-center bg-bg-raised px-3 py-2 rounded-lg">
      <div className="flex flex-col">
        <span className="text-text-primary text-sm font-medium">
          {stock.stockName}
        </span>

        <span className="text-text-muted text-xs uppercase">
          {stock.stockSymbol}
        </span>
      </div>

      <div>
        {stock.currentPrice ? (
          <span className="st-mono text-text-primary">
            ₹{Number(stock.currentPrice).toLocaleString("en-IN")}
          </span>
        ) : (
          <span className="text-xs text-text-muted">N/A</span>
        )}
      </div>
    </div>
  );
}
