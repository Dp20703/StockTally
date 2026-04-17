import React from "react";
import GetStockPrice from "../../../utils/GetStockPrice";
import { StatusBadge } from "components/ui";
import { profitColor } from "theme/theme";

function TradeCard({
  trade,
  showTrades,
  handleTradeId,
  setUpdateModal,
  setCloseModal,
  handleDelete,
}) {
  const isProfitNegative = trade.profit < 0;
  const isFinalNegative = trade.finalProfit < 0;

  return (
    <tr className="hover:bg-bg-overlay transition">
      {/* Stock Name */}
      <td className="px-4 py-3 text-text-primary font-medium">
        {trade.stockName}
      </td>

      {/* Symbol */}
      <td className="px-4 py-3 font-mono text-green-400">
        {trade.stockSymbol}
      </td>

      {/* Buy Price */}
      <td className="px-4 py-3 font-mono">₹ {trade.buyPrice}</td>

      {/* Buy Date */}
      <td className="px-4 py-3 text-text-muted">
        {trade.buyDate?.split("T")[0]}
      </td>

      {/* Sell Price */}
      <td className="px-4 py-3 font-mono">₹ {trade.sellPrice}</td>

      {/* Sell Date */}
      <td className="px-4 py-3 text-text-muted">
        {trade.sellDate?.split("T")[0]}
      </td>

      {/* Current Qty */}
      {showTrades === "open" && <td className="px-4 py-3">{trade.quantity}</td>}

      {/* Original Qty */}
      <td className="px-4 py-3">{trade.originalQuantity}</td>

      {/* Type */}
      <td className="px-4 py-3">
        <StatusBadge status={trade.type} />
      </td>

      {/* Entry */}
      <td className="px-4 py-3">
        <StatusBadge status={trade.entryType} />
      </td>

      {/* Live Price */}
      <td className="px-4 py-3">
        <GetStockPrice
          stockSymbol={trade.stockSymbol}
          quantity={trade.quantity}
          buyPrice={trade.buyPrice}
          sellPrice={trade.sellPrice}
        />
      </td>

      {/* Current P&L */}
      {trade.status === "open" && (
        <td className="px-4 py-3 font-mono">
          <span className={profitColor(isProfitNegative)}>
            {isProfitNegative ? "▼" : "▲"} ₹ {trade.profit?.toFixed(2)}
          </span>
        </td>
      )}

      {/* Final P&L */}
      <td className="px-4 py-3 font-mono">
        <span className={profitColor(isFinalNegative)}>
          {isFinalNegative ? "▼" : "▲"} ₹ {trade.finalProfit?.toFixed(2)}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <StatusBadge status={trade.status} />
      </td>

      {/* Actions */}
      <td className="px-4 py-3 flex gap-2">
        {trade.status === "open" && (
          <>
            <button
              className="st-btn-amber text-xs"
              onClick={() => {
                handleTradeId(trade._id);
                setUpdateModal(true);
              }}
            >
              Update
            </button>

            <button
              className="st-btn-ghost text-xs"
              onClick={() => {
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
          onClick={() => handleDelete(trade._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default React.memo(TradeCard);
