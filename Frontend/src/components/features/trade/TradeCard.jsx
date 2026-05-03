import { useState } from "react";
import GetStockPrice from "utils/GetStockPrice";
import { StatusBadge } from "components/ui";

export default function TradeCard({
  trade,
  handleTradeId,
  setUpdateModal,
  setCloseModal,
  handleDelete,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* MAIN ROW */}
      <tr
        className="cursor-pointer hover:bg-bg-overlay transition"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {/* Asset */}
        <td className="flex items-center gap-3 px-4 py-3">
          <span className="st-badge-green">{trade.stockSymbol}</span>

          <div>
            <p className="text-text-primary">{trade.stockName}</p>
            <p className="text-xs text-text-muted">Stock</p>
          </div>
        </td>

        <td className="font-mono">₹ {trade.buyPrice}</td>
        <td className="font-mono">{trade.sellPrice || "—"}</td>
        <td>{trade.quantity}</td>

        <td className="font-mono">
          <span
            className={`${trade.finalProfit >= 0 ? "st-profit" : "st-loss"}`}
          >
            {trade.finalProfit >= 0 ? "+" : ""}₹ {trade.finalProfit?.toFixed(2)}
          </span>
        </td>

        <td>
          <StatusBadge status={trade.status} />
        </td>

        <td>
          <div className="flex gap-2">
            {trade.status === "open" && (
              <>
                <button
                  className="st-btn-ghost text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTradeId(trade._id);
                    setUpdateModal(true);
                  }}
                >
                  Update
                </button>

                <button
                  className="st-btn-red text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTradeId(trade._id);
                    setCloseModal(true);
                  }}
                >
                  Close
                </button>
              </>
            )}

            <button
              className="st-btn-red text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(trade._id);
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* EXPANDED ROW */}
      {expanded && (
        <tr>
          <td colSpan="7">
            <div className="bg-bg-raised p-4 rounded-lg animate-slide-down">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-text-muted">Buy Date</p>
                  <p>{trade.buyDate?.split("T")[0]}</p>
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <p className="text-xs text-text-muted">Sell Date</p>
                  <p>{trade.sellDate?.split("T")[0] || "—"}</p>
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <p className="text-xs text-text-muted">Type</p>
                  <StatusBadge status={trade.type} />
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <p className="text-xs text-text-muted">Entry</p>
                  <StatusBadge status={trade.entryType} />
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <p className="text-xs text-text-muted">Original Qty</p>
                  <p>{trade.originalQuantity}</p>
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <p className="text-xs text-text-muted">Live Price</p>
                  <GetStockPrice
                    stockSymbol={trade.stockSymbol}
                    quantity={trade.quantity}
                    buyPrice={trade.buyPrice}
                    sellPrice={trade.sellPrice}
                  />
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
