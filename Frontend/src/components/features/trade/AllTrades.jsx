import { useEffect } from "react";
import { capitalize } from "theme/theme";
import { TradesMobile } from "./TradesMobile";
import { TradesTable } from "./TradesTable";
import useTrades from "../../../hooks/useTrades";

export default function AllTrades() {
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
            <TradesTable trades={trades} />
          </div>

          {/* Mobile */}
          <div className="md:hidden p-3">
            <TradesMobile trades={trades} />
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
