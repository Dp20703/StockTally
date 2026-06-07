import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTrades } from "../../../context/TradeContext";
import api from "services/apiClient";

export default function CreateTrade({ closeModal }) {
  const { fetchTrades } = useTrades();
  const navigate = useNavigate();

  const [tradeData, setTradeData] = useState({
    stockName: "",
    stockSymbol: "",
    quantity: "",
    entryType: "",
    type: "",
    price: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTradeData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.post("/trades/create", tradeData);

      toast.success("Trade created successfully");

      fetchTrades();
      closeModal();
      navigate("/trade/dashboard");

      // reset form
      setTradeData({
        stockName: "",
        stockSymbol: "",
        quantity: "",
        entryType: "",
        type: "",
        price: "",
        date: "",
      });
    } catch (error) {
      toast.error("Failed to create trade");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-lg text-text-primary font-medium">
        Enter Trade Details
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="st-label">Stock Name</label>
          <input
            type="text"
            name="stockName"
            value={tradeData.stockName}
            onChange={handleChange}
            className="st-input"
            placeholder="Enter stock name"
          />
        </div>

        <div>
          <label className="st-label">Stock Symbol</label>
          <input
            type="text"
            name="stockSymbol"
            value={tradeData.stockSymbol.toUpperCase()}
            onChange={handleChange}
            className="st-input"
            placeholder="Ex: RELIANCE"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="st-label">Price</label>
          <input
            type="number"
            name="price"
            value={tradeData.price}
            onChange={handleChange}
            placeholder="Enter stock price"
            className="st-input"
          />
        </div>

        <div>
          <label className="st-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={tradeData.quantity}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className="st-input"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="st-label">Entry Type</label>
          <select
            name="entryType"
            value={tradeData.entryType}
            onChange={handleChange}
            className="st-select"
          >
            <option value="">Select</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div>
          <label className="st-label">Position Type</label>
          <select
            name="type"
            value={tradeData.type}
            onChange={handleChange}
            className="st-select"
          >
            <option value="">Select</option>
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>

        <div>
          <label className="st-label">Date</label>
          <input
            type="date"
            name="date"
            value={tradeData.date}
            onChange={handleChange}
            className="st-input"
          />
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="st-btn-green w-full mt-2">
        Submit
      </button>
    </form>
  );
}
