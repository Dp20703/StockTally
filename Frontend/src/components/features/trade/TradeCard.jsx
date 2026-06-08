import { useState } from "react";
import { StatusBadge, PartialBadge } from "components/ui";
import { GetStockPrice } from "utils/GetStockPrice";
import useTrades from "../../../hooks/useTrades";
import Swal from "sweetalert2";
import useModal from "../../../hooks/useModal";
import { deleteTrade } from "./DeleteTrade";

export default function TradeCard({ trade }) {
  const { openModal } = useModal();
  const { setTradeId, trades, page, fetchTrades } = useTrades();

  const [expanded, setExpanded] = useState(false);

  /* ── Delete ───────────────────────── */
  const handleDelete = async (tradeId) => {
    const result = await Swal.fire({
      title: "Delete trade?",
      text: "This trade will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#1e2d3d",
      confirmButtonText: "Yes, delete it",
      background: "#0d1117",
      color: "#cbd5e1",
    });

    if (result.isConfirmed) {
      const success = await deleteTrade(tradeId);

      if (success) {
        if (trades.length === 1 && page > 1) {
          fetchTrades(page - 1);
        } else {
          fetchTrades(page);
        }
      }
    }
  };

  const isActive = trade?.status === "open" || trade?.status === "partial";

  return (
    <>
      <tr
        className="cursor-pointer hover:bg-bg-overlay transition"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Asset */}
        <td className="flex items-center gap-3 px-4 py-3">
          <span className="st-badge-green">{trade?.stockSymbol}</span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-text-primary">{trade?.stockName}</p>
              {/* ✅ Partial badge — visible at a glance without changing status column */}
              {trade?.status === "partial" && <PartialBadge />}
            </div>
            <p className="text-xs text-text-muted">Stock</p>
          </div>
        </td>

        <td className="font-mono">₹ {trade?.entryPrice}</td>
        <td className="font-mono">
          ₹ {trade?.avgExitPrice?.toFixed(2) || "—"}
        </td>

        {/* ✅ Show remainingQty / openQty for partial trades */}
        <td>
          {trade?.status === "partial" ? (
            <span>
              {trade?.remainingQty}{" "}
              <span className="text-text-muted text-xs">
                / {trade?.openQty}
              </span>
            </span>
          ) : (
            trade?.remainingQty
          )}
        </td>

        <td className="font-mono">
          <span className={trade?.realizedPnL >= 0 ? "st-profit" : "st-loss"}>
            {trade?.realizedPnL >= 0 ? "+" : ""}₹{" "}
            {trade?.realizedPnL?.toFixed(2)}
          </span>
        </td>

        <td>
          <StatusBadge status={trade?.status} />
        </td>

        <td>
          <div className="flex gap-2">
            {isActive && (
              <>
                <button
                  className="st-btn-ghost text-xs border-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("closeTrade");
                    setTradeId(trade?._id);
                  }}
                >
                  {trade?.status === "partial" ? "Close More" : "Close"}
                </button>
                <button
                  className="st-btn-green text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("addPosition");
                    setTradeId(trade?._id);
                  }}
                >
                  Add
                </button>

                <button
                  className="st-btn-amber text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("updateTrade");
                    setTradeId(trade?._id);
                  }}
                >
                  Update
                </button>
              </>
            )}
            <button
              className="st-btn-red text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(trade?._id);
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan="7">
            <div className="bg-bg-raised p-4 rounded-lg animate-slide-down">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-text-muted">Entry Date</p>
                  <p>{trade?.entryDate?.split("T")[0]}</p>
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <p className="text-xs text-text-muted">Last Exit Date</p>
                  <p>{trade?.lastExitDate?.split("T")[0] || "—"}</p>
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <p className="text-xs text-text-muted">Type</p>
                  <StatusBadge status={trade?.type} />
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <p className="text-xs text-text-muted">Entry</p>
                  <StatusBadge status={trade?.entryType} />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-xs text-text-muted">Original Qty</p>
                  <p> {trade?.initialQty || trade?.openQty}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-xs text-text-muted">Closed Qty</p>
                  <p>{trade?.closedQty}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-xs text-text-muted">Remaining Qty</p>
                  <p>{trade?.remainingQty}</p>
                </div>

                {/* ✅ Avg exit price only meaningful once something is closed */}
                {trade?.closedQty > 0 && (
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-text-muted">Avg Exit Price</p>
                    <p>₹ {trade?.avgExitPrice?.toFixed(2)}</p>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <GetStockPrice trade={trade} />
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
