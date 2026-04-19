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
      } catch (err) {
        toast.error("Failed to fetch trade data");
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

    try {
      const res = await api.post(`/trades/close/${tradeId}`, closeData);

      if (res?.status === 200) {
        toast.success("Trade closed successfully", {
          position: "top-right",
          autoClose: 1000,
        });
        fetchTrades();
        setCloseModal(false);
        navigate("/trade/dashboard");
      } else {
        toast.error("Unexpected error occurred");
      }
    } catch (error) {
      toast.error("Failed to close trade");
    }
  };

  if (!tradeData) return <p>Loading...</p>;

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6">
      {/* Open Trade Info */}
      <div>
        <h3 className="text-green-400 font-medium mb-2">Open Trade</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input className="st-input" readOnly value={tradeData.stockName} />
          <input className="st-input" readOnly value={tradeData.stockSymbol} />

          <input
            className="st-input"
            readOnly
            value={tradeData.buyPrice || ""}
          />
          <input
            className="st-input"
            readOnly
            value={(tradeData.buyDate || "").slice(0, 10)}
          />

          <input
            className="st-input"
            readOnly
            value={tradeData.originalQuantity || ""}
          />
        </div>
      </div>

      {/* Closed check */}
      {tradeData.status === "closed" ? (
        <p className="text-red-400 text-center">Trade already closed</p>
      ) : (
        <>
          {/* Close Trade */}
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
                <label className="st-label">Close Quantity</label>
                <input
                  type="number"
                  name="closeQuantity"
                  value={closeData.closeQuantity}
                  onChange={handleChange}
                  placeholder="Enter close quantity"
                  className="st-input"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="st-btn-red">
            Close Trade
          </button>
        </>
      )}
    </form>
  );
}
