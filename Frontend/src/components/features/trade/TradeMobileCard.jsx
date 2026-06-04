import { StatusBadge, PartialBadge } from "components/ui";
import { useState } from "react";
import { GetStockPrice } from "utils/GetStockPrice";

export default function TradeMobileCard({
  trade,
  handleTradeId,
  setUpdateModal,
  setCloseModal,
  handleDelete,
  setAddPosition,
}) {
  const [expanded, setExpanded] = useState(false);
  const isActive = trade?.status === "open" || trade?.status === "partial";

  return (
    <div className="st-card p-4 flex flex-col gap-3">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded((p) => !p)}
      >
        <div className="flex items-center gap-2">
          <span className="st-badge-green">{trade?.stockSymbol}</span>
          <span className="text-text-primary text-sm">{trade?.stockName}</span>
          {trade?.status === "partial" && <PartialBadge />}
        </div>
        <span
          className={`font-mono text-sm ${trade?.realizedPnL >= 0 ? "st-profit" : "st-loss"}`}
        >
          {trade?.realizedPnL >= 0 ? "+" : ""}₹ {trade?.realizedPnL?.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between text-xs text-text-muted">
        <span>Buy: ₹{trade?.entryPrice}</span>
        <span>Sell: ₹{trade?.avgExitPrice?.toFixed(2) || "—"}</span>
        {/* ✅ Show remaining/total for partial */}
        <span>
          Qty:{" "}
          {trade?.status === "partial"
            ? `${trade?.remainingQty}/${trade?.openQty}`
            : trade?.remainingQty}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <StatusBadge status={trade?.status} />
        <span className="text-xs text-text-muted">Tap for details</span>
      </div>

      {expanded && (
        <div className="border-t border-bg-border pt-3 flex flex-col gap-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-text-muted">Entry Date</p>
              <p>{trade?.entryDate?.split("T")[0]}</p>
            </div>
            <div>
              <p className="text-text-muted">Last Exit Date</p>
              <p>{trade?.lastExitDate?.split("T")[0] || "—"}</p>
            </div>
          </div>

          {/* ✅ Qty breakdown — useful for partial trades */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-text-muted">Original</p>
              <p>{trade?.openQty}</p>
            </div>
            <div>
              <p className="text-text-muted">Closed</p>
              <p>{trade?.closedQty}</p>
            </div>
            <div>
              <p className="text-text-muted">Remaining</p>
              <p>{trade?.remainingQty}</p>
            </div>
          </div>

          {trade?.closedQty > 0 && (
            <div className="text-xs">
              <p className="text-text-muted">Avg Exit Price</p>
              <p>₹ {trade?.avgExitPrice?.toFixed(2)}</p>
            </div>
          )}

          <div className="flex justify-between">
            <StatusBadge status={trade?.type} />
            <StatusBadge status={trade?.entryType} />
          </div>

          <div>
            <GetStockPrice trade={trade} />
          </div>

          <div className="flex gap-2 pt-2">
            {isActive && (
              <>
                <button
                  className="st-btn-ghost border-gray-500 text-xs flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTradeId(trade?._id);
                    setCloseModal(true);
                  }}
                >
                  {trade?.status === "partial" ? "Close More" : "Close"}
                </button>
                <button
                  className="st-btn-green text-xs flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTradeId(trade?._id);
                    setAddPosition(true);
                  }}
                >
                  Add
                </button>
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
