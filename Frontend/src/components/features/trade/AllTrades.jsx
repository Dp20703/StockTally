import { useEffect } from "react";
import Swal from "sweetalert2";
import TradesTable from "./TradesTable";
import { TradesMobile } from "./TradesMobile";
import { useTrades } from "../../../context/TradeContext";
import { capitalize } from "theme/theme";

export default function AllTrades({
  setUpdateModal,
  handleTradeId,
  setCloseModal,
  showTrades,
}) {
  const {
    trades,
    page,
    totalPages,
    fetchTrades,
    nextPage,
    prevPage,
    goToPage,
  } = useTrades();

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  const getPages = () => {
    const pages = [];
    for (
      let i = Math.max(1, page - 2);
      i <= Math.min(totalPages, page + 2);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };
  const tradesToDisplay = trades.filter((trade) => trade.status === showTrades);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

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
      await fetch(`/api/trades/${tradeId}`, { method: "DELETE" });
      await fetchTrades();

      Swal.fire({
        title: "Deleted!",
        text: "Trade removed successfully.",
        icon: "success",
        background: "#0d1117",
        color: "#cbd5e1",
        confirmButtonColor: "#166534",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-md text-text-primary">
          {capitalize(showTrades)} Trades
        </h2>

        <span className="text-xs text-text-muted">
          {tradesToDisplay.length} record
          {tradesToDisplay.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Empty State */}
      {tradesToDisplay.length === 0 ? (
        <div className="st-card p-6 text-center text-text-muted">
          No trades found
        </div>
      ) : (
        <div className="overflow-hidden">
          {/* Desktop Table */}
          <div className="st-card hidden md:block">
            <TradesTable
              trades={tradesToDisplay}
              handleTradeId={handleTradeId}
              setUpdateModal={setUpdateModal}
              setCloseModal={setCloseModal}
              handleDelete={handleDelete}
            />
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden p-3">
            <TradesMobile
              trades={tradesToDisplay}
              handleTradeId={handleTradeId}
              setUpdateModal={setUpdateModal}
              setCloseModal={setCloseModal}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      )}

      {/* ── Pagination ───────────────────────── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">
          {/* Prev */}
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="st-btn-ghost px-3 py-1 text-sm"
          >
            Prev
          </button>

          {/* Page numbers */}
          <div className="flex gap-1 flex-wrap">
            {getPages().map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 text-sm rounded-md border ${
                  page === p
                    ? "border-green-border text-green-400"
                    : "border-bg-border text-text-muted"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="st-btn-ghost px-3 py-1 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
