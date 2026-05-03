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
  const { trades, fetchTrades } = useTrades();

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
        <div className="st-card overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block">
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
    </div>
  );
}
