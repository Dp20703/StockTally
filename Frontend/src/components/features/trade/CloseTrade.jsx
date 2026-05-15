import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "services/apiClient";
import { useTrades } from "../../../context/TradeContext";

export default function CloseTrade({ setCloseModal, tradeId }) {
  const navigate = useNavigate();
  const { fetchTrades } = useTrades();

  const [tradeData, setTradeData] = useState(null);
  const [closeData, setCloseData] = useState({
    closePrice: "",
    closeDate: "",
    closeQuantity: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/trades/get_trade/${tradeId}`);
        setTradeData(data?.trade);
      } catch {
        toast.error("Failed to fetch trade data", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    };
    fetchData();
  }, [tradeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCloseData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const closePrice = parseFloat(closeData.closePrice);
    const closeQuantity = parseInt(closeData.closeQuantity, 10);

    // ── Frontend guards ───────────────────────────────────────────────────────
    if (!closeData.closeDate) {
      return toast.error("Please select a close date", {
        position: "top-right",
        autoClose: 1500,
      });
    }
    if (isNaN(closePrice) || closePrice <= 0) {
      return toast.error("Close price must be greater than 0", {
        position: "top-right",
        autoClose: 1500,
      });
    }
    if (isNaN(closeQuantity) || closeQuantity < 1) {
      return toast.error("Close quantity must be at least 1", {
        position: "top-right",
        autoClose: 1500,
      });
    }
    if (closeQuantity > tradeData.remainingQty) {
      return toast.error(
        `Cannot close ${closeQuantity}. Only ${tradeData.remainingQty} units remaining.`,
        { position: "top-right", autoClose: 2000 },
      );
    }

    try {
      const res = await api.post(`/trades/close/${tradeId}`, {
        closePrice, // ✅ number, not string
        closeDate: closeData.closeDate,
        closeQuantity, // ✅ number, not string
      });

      if (res?.status === 200) {
        const isFullyClosed = res.data?.trade?.status === "closed";
        toast.success(
          isFullyClosed
            ? "Trade fully closed"
            : `Closed ${closeQuantity} units. Trade partially closed.`,
          { position: "top-right", autoClose: 1500 },
        );
        fetchTrades();
        setCloseModal(false);
        navigate("/trade/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to close trade", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  if (!tradeData)
    return <p className="text-text-muted text-center p-4">Loading...</p>;

  const isPartial = tradeData.status === "partial";

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6">
      {/* ── Trade Info ──────────────────────────────────────────────────────── */}
      <div>
        <h3 className="text-green-400 font-medium mb-2">
          {isPartial ? "Partially Open Trade" : "Open Trade"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input className="st-input" readOnly value={tradeData?.stockName} />
          <input className="st-input" readOnly value={tradeData?.stockSymbol} />
          <input
            className="st-input"
            readOnly
            value={`Entry Price: ₹${tradeData?.entryPrice}`}
          />
          <input
            className="st-input"
            readOnly
            value={`Entry Date: ${(tradeData?.entryDate || "").slice(0, 10)}`}
          />
        </div>

        {/* ✅ Qty breakdown — critical for partial trades */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="st-card p-3 text-center">
            <p className="text-xs text-text-muted mb-1">Original Qty</p>
            <p className="text-text-primary font-mono">{tradeData?.openQty}</p>
          </div>
          <div className="st-card p-3 text-center">
            <p className="text-xs text-text-muted mb-1">Closed Qty</p>
            <p className="text-amber-400 font-mono">{tradeData?.closedQty}</p>
          </div>
          <div className="st-card p-3 text-center">
            <p className="text-xs text-text-muted mb-1">Remaining Qty</p>
            <p className="text-green-400 font-mono">
              {tradeData?.remainingQty}
            </p>
          </div>
        </div>

        {/* ✅ Show already-realized P&L for partial trades */}
        {isPartial && tradeData?.realizedPnL !== 0 && (
          <div className="mt-3 p-3 st-card">
            <p className="text-xs text-text-muted mb-1">Realized P&L so far</p>
            <p
              className={`font-mono ${tradeData?.realizedPnL >= 0 ? "st-profit" : "st-loss"}`}
            >
              {tradeData?.realizedPnL >= 0 ? "+" : ""}₹{" "}
              {tradeData?.realizedPnL?.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* ── Already closed guard ─────────────────────────────────────────────── */}
      {tradeData.status === "closed" ? (
        <p className="text-red-400 text-center">
          This trade is already fully closed.
        </p>
      ) : (
        <>
          {/* ── Close Fields ─────────────────────────────────────────────────── */}
          <div>
            <h3 className="text-red-400 font-medium mb-2">Close Trade</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="st-label">Close Price</label>
                <input
                  type="number"
                  name="closePrice"
                  value={closeData.closePrice}
                  onChange={handleChange}
                  placeholder="Enter close price"
                  min="0.01"
                  step="0.01"
                  className="st-input"
                />
              </div>

              <div>
                <label className="st-label">Close Date</label>
                <input
                  type="date"
                  name="closeDate"
                  value={closeData.closeDate}
                  onChange={handleChange}
                  className="st-input"
                />
              </div>

              <div>
                <label className="st-label">
                  Close Quantity
                  <span className="text-text-muted text-xs ml-1">
                    (max {tradeData?.remainingQty})
                  </span>
                </label>
                <input
                  type="number"
                  name="closeQuantity"
                  value={closeData.closeQuantity}
                  onChange={handleChange}
                  placeholder={`1 – ${tradeData?.remainingQty}`}
                  min="1"
                  max={tradeData?.remainingQty} // ✅ browser-level cap
                  step="1"
                  className="st-input"
                />
              </div>
            </div>

            {/* ✅ Live preview of what this close will do */}
            {closeData.closeQuantity && closeData.closePrice && (
              <div className="mt-3 p-3 st-card text-xs text-text-muted flex flex-wrap gap-4">
                <span>
                  Closing{" "}
                  <span className="text-text-primary">
                    {closeData.closeQuantity}
                  </span>{" "}
                  units @ ₹
                  <span className="text-text-primary">
                    {closeData.closePrice}
                  </span>
                </span>
                <span>
                  Remaining after close:{" "}
                  <span className="text-green-400">
                    {Math.max(
                      0,
                      tradeData.remainingQty -
                        parseInt(closeData.closeQuantity || 0),
                    )}
                  </span>
                </span>
                {parseInt(closeData.closeQuantity) ===
                  tradeData.remainingQty && (
                  <span className="text-amber-400">
                    This will fully close the trade.
                  </span>
                )}
              </div>
            )}
          </div>

          <button type="submit" className="st-btn-red">
            {parseInt(closeData.closeQuantity) === tradeData.remainingQty
              ? "Close Trade"
              : "Partially Close Trade"}
          </button>
        </>
      )}
    </form>
  );
}
