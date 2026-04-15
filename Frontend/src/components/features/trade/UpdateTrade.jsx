import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTrades } from "../../../context/TradeContext";
import api from "services/apiClient";

export default function UpdateTrade({ setUpdateModal, tradeId }) {
  const navigate = useNavigate();
  const { fetchTrades } = useTrades();

  const [tradeData, setTradeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/trades/get_trade/${tradeId}`);
      setTradeData(res?.data?.trade[0]);
    };
    fetchData();
  }, [tradeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTradeData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/trades/update/${tradeId}`, tradeData);

      if (res?.status === 200) {
        toast.success("Trade updated successfully", {
          position: "top-right",
          autoClose: 1000,
        });
        setUpdateModal(false);
        navigate("/trade/dashboard");
      } else {
        toast.error("Unexpected error occurred");
      }
    } catch (error) {
      toast.error("Failed to update trade");
    } finally {
      fetchTrades();
    }
  };

  if (!tradeData) return <p>Loading...</p>;

  if (tradeData.status === "closed") {
    return (
      <div className="text-center py-6">
        <p className="text-red-400">
          Trade already closed and cannot be updated
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6">
      <h2 className="text-lg text-text-primary font-medium">Update Trade</h2>

      {/* Row 1 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="st-label">Stock Name</label>
          <input
            name="stockName"
            value={tradeData.stockName}
            onChange={handleChange}
            className="st-input"
          />
        </div>

        <div>
          <label className="st-label">Stock Symbol</label>
          <input
            name="stockSymbol"
            value={tradeData.stockSymbol}
            onChange={handleChange}
            className="st-input"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="st-label">Buy Price</label>
          <input
            type="number"
            name="buyPrice"
            value={tradeData.buyPrice || ""}
            onChange={handleChange}
            className="st-input"
            disabled={tradeData.buyPrice === null}
          />
        </div>

        <div>
          <label className="st-label">Sell Price</label>
          <input
            type="number"
            name="sellPrice"
            value={tradeData.sellPrice || ""}
            onChange={handleChange}
            className="st-input"
            disabled={tradeData.sellPrice === null}
          />
        </div>

        <div>
          <label className="st-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={tradeData.quantity || ""}
            onChange={handleChange}
            className="st-input"
          />
        </div>

        <div>
          <label className="st-label">Original Quantity</label>
          <input
            type="number"
            name="originalQuantity"
            value={tradeData.originalQuantity || ""}
            onChange={handleChange}
            className="st-input"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid md:grid-cols-4 gap-4">
        <select
          name="entryType"
          value={tradeData.entryType}
          onChange={handleChange}
          className="st-select"
        >
          <option value="">Select Entry</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>

        <select
          name="type"
          value={tradeData.type}
          onChange={handleChange}
          className="st-select"
        >
          <option value="">Select Type</option>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>

        <input
          type="date"
          name="buyDate"
          value={(tradeData.buyDate || "").slice(0, 10)}
          onChange={handleChange}
          className="st-input"
          disabled={!tradeData.buyDate}
        />

        <input
          type="date"
          name="sellDate"
          value={(tradeData.sellDate || "").slice(0, 10)}
          onChange={handleChange}
          className="st-input"
          disabled={!tradeData.sellDate}
        />
      </div>

      {/* Submit */}
      <button type="submit" className="st-btn-green">
        Update Trade
      </button>
    </form>
  );
}
