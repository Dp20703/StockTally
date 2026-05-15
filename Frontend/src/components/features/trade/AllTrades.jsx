import { useEffect } from "react";
import Swal from "sweetalert2";
import TradesTable from "./TradesTable";
import { TradesMobile } from "./TradesMobile";
import { useTrades } from "../../../context/TradeContext";
import { capitalize } from "theme/theme";
import { deleteTrade } from "./DeleteTrade";

export default function AllTrades({
  setUpdateModal,
  handleTradeId,
  setCloseModal,
}) {
  const {
    trades,
    loading,
    page,
    totalPages,
    search,
    setSearch,
    status,
    fetchTrades,
    nextPage,
    prevPage,
    goToPage,
  } = useTrades();
  
  /* ── Initial Fetch ───────────────────── */
  useEffect(() => {
    fetchTrades(1);
  }, [fetchTrades]);

  /* ── Pagination range ───────────────── */
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

  return (
    <div className="flex flex-col gap-4">
      {/* ── Header + Search ───────────────── */}
      <div className="flex items-center justify-between gap-3 flex-wrap px-1">
        <h2 className="text-md text-text-primary">
          {capitalize(status)} Trades
        </h2>

        <input
          type="text"
          placeholder="Search trades..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="st-input max-w-xs"
        />
      </div>

      {/* Record count */}
      <span className="text-xs text-text-muted px-1">
        {trades.length} record
        {trades.length !== 1 ? "s" : ""}
      </span>

      {/* ── Loading ───────────────── */}
      {loading ? (
        <div className="st-card p-6 text-center text-text-muted">
          Loading...
        </div>
      ) : trades.length === 0 ? (
        <div className="st-card p-6 text-center text-text-muted">
          No trades found
        </div>
      ) : (
        <div className="overflow-hidden">
          {/* Desktop */}
          <div className="st-card hidden md:block">
            <TradesTable
              trades={trades}
              handleTradeId={handleTradeId}
              setUpdateModal={setUpdateModal}
              setCloseModal={setCloseModal}
              handleDelete={handleDelete}
            />
          </div>

          {/* Mobile */}
          <div className="md:hidden p-3">
            <TradesMobile
              trades={trades}
              handleTradeId={handleTradeId}
              setUpdateModal={setUpdateModal}
              setCloseModal={setCloseModal}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      )}

      {/* ── Pagination ───────────────── */}
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

          {/* Numbers */}
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
