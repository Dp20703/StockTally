import React from "react";
import GetStockPrice from "../../../utils/GetStockPrice";

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
        <span className="px-2 py-1 rounded-full text-xs bg-green-900 text-green-400 border border-green-border">
          {trade.type}
        </span>
      </td>

      {/* Entry */}
      <td className="px-4 py-3">
        <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-400 border border-blue-border">
          {trade.entryType}
        </span>
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
          <span
            className={isProfitNegative ? "text-red-400" : "text-green-400"}
          >
            {isProfitNegative ? "▼" : "▲"} ₹ {trade.profit?.toFixed(2)}
          </span>
        </td>
      )}

      {/* Final P&L */}
      <td className="px-4 py-3 font-mono">
        <span className={isFinalNegative ? "text-red-400" : "text-green-400"}>
          {isFinalNegative ? "▼" : "▲"} ₹ {trade.finalProfit?.toFixed(2)}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs border ${
            trade.status === "open"
              ? "bg-green-900 text-green-400 border-green-border"
              : "bg-red-900 text-red-400 border-red-border"
          }`}
        >
          {trade.status}
        </span>
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
