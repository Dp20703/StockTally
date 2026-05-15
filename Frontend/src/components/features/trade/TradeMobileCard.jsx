import { StatusBadge } from "components/ui";
import { useState } from "react";
import GetStockPrice from "utils/GetStockPrice";

export default function TradeMobileCard({
  trade,
  handleTradeId,
  setUpdateModal,
  setCloseModal,
  handleDelete,
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="st-card p-4 flex flex-col gap-3">
      {/* HEADER */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <span className="st-badge-green">{trade?.stockSymbol}</span>
          <span className="text-text-primary text-sm">{trade?.stockName}</span>
        </div>

        <span
          className={`font-mono text-sm ${trade?.realizedPnL >= 0 ? "st-profit" : "st-loss"}`}
        >
          {trade?.realizedPnL >= 0 ? "+" : ""}₹ {trade?.realizedPnL?.toFixed(2)}
        </span>
      </div>

      {/* BASIC INFO */}
      <div className="flex justify-between text-xs text-text-muted">
        <span>Buy: ₹{trade?.entryPrice}</span>
        <span>Sell: ₹{trade?.avgExitPrice|| "—"}</span>
        <span>Qty: {trade?.remainingQty}</span>
      </div>

      {/* STATUS */}
      <div className="flex justify-between items-center">
        <StatusBadge status={trade?.status} />
        <span className="text-xs text-text-muted">Tap for details</span>
      </div>

      {/* EXPANDED */}
      {expanded && (
        <div className="border-t border-bg-border pt-3 flex flex-col gap-3 animate-fade-in">
          {/* Dates */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-text-muted">Buy Date</p>
              <p>{trade?.entryDate?.split("T")[0]}</p>
            </div>

            <div>
              <p className="text-text-muted">Sell Date</p>
              <p>{trade?.lastExitDate?.split("T")[0] || "—"}</p>
            </div>
          </div>

          {/* Type + Entry */}
          <div className="flex justify-between">
            <StatusBadge status={trade?.type} />
            <StatusBadge status={trade?.entryType} />
          </div>

          {/* Live Price */}
          <div>
            <p className="text-xs text-text-muted">Live Price</p>
            <GetStockPrice
              stockSymbol={trade?.stockSymbol}
              quantity={trade?.remainingQty}
              buyPrice={trade?.entryPrice}
              sellPrice={trade?.avgExitPrice}
            />
          </div>

          {/* Quantity */}
          <div className="text-xs text-text-muted">
            Original Qty: {trade?.openQty}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 pt-2">
            {trade?.status === "open" && (
              <>
                <button
                  className="st-btn-amber text-xs flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTradeId(trade?._id);
                    setUpdateModal(true);
                  }}
                >
                  Update
                </button>

                <button
                  className="st-btn-ghost text-xs flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTradeId(trade?._id);
                    setCloseModal(true);
                  }}
                >
                  Close
                </button>
              </>
            )}

            <button
              className="st-btn-red text-xs flex-1"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(trade?._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
