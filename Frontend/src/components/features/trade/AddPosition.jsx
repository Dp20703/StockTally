import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "services/apiClient";
import useModal from "../../../hooks/useModal";
import useTrade from "../../../hooks/useTrade";

export default function AddPosition() {
  const { closeModal } = useModal();
  const { tradeId, fetchTrades } = useTrade();

  const [trade, setTrade] = useState(null);

  const [formData, setFormData] = useState({
    quantity: "",
    price: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrade = async () => {
      try {
        const { data } = await api.get(`/trades/get_trade/${tradeId}`);

        setTrade(data?.trade);
      } catch (error) {
        toast.error("Failed to fetch trade", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    };

    fetchTrade();
  }, [tradeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const qty = Number(formData.quantity) || 0;
  const price = Number(formData.price) || 0;

  const currentQty = trade?.openQty || 0;
  const currentAvg = trade?.entryPrice || 0;

  const newQty = currentQty + qty;

  const newAvg =
    newQty > 0
      ? ((currentAvg * currentQty + price * qty) / newQty).toFixed(2)
      : 0;

  const averagingType =
    price > currentAvg
      ? "Averaging Up"
      : price < currentAvg
        ? "Averaging Down"
        : "Same Price";

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(`/trades/add-position/${tradeId}`, formData);

      if (res.status === 200) {
        toast.success("Position added successfully", {
          position: "top-right",
          autoClose: 1000,
        });

        fetchTrades();
        closeModal();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add position", {
        position: "top-right",
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!trade) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (trade.status === "closed") {
    return (
      <div className="text-center py-6">
        <p className="text-red-400">Cannot add position to a closed trade</p>
      </div>
    );
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6">
      <h2 className="text-lg text-text-primary font-medium">Add Position</h2>

      {/* Current Position */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="st-label">Current Quantity</label>

          <input value={trade.openQty} className="st-input" disabled />
        </div>

        <div>
          <label className="st-label">Remaining Quantity</label>

          <input value={trade.remainingQty} className="st-input" disabled />
        </div>

        <div>
          <label className="st-label">Current Avg Price</label>

          <input value={trade.entryPrice} className="st-input" disabled />
        </div>
      </div>

      {/* Add Position Inputs */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="st-label">Additional Quantity</label>

          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="st-input"
            placeholder="Enter quantity"
            required
          />
        </div>

        <div>
          <label className="st-label">Entry Price</label>

          <input
            type="number"
            step="0.01"
            min="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="st-input"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label className="st-label">Entry Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="st-input"
            required
          />
        </div>
      </div>

      {/* Preview */}
      {qty > 0 && price > 0 && (
        <div className="rounded-xl border border-border-primary bg-bg-secondary p-5">
          <h3 className="text-text-primary font-medium mb-4">
            Position Preview
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-text-secondary text-sm">Current Position</p>

              <p className="text-text-primary font-medium">
                {currentQty} Shares @ ₹{currentAvg}
              </p>
            </div>

            <div>
              <p className="text-text-secondary text-sm">Adding</p>

              <p className="text-text-primary font-medium">
                {qty} Shares @ ₹{price}
              </p>
            </div>

            <div>
              <p className="text-text-secondary text-sm">New Quantity</p>

              <p className="text-green-500 font-semibold">{newQty} Shares</p>
            </div>

            <div>
              <p className="text-text-secondary text-sm">New Average Price</p>

              <p className="text-green-500 font-semibold">₹{newAvg}</p>
            </div>

            <div className="md:col-span-2">
              <span className="inline-flex px-3 py-1 rounded-lg text-sm bg-bg-tertiary text-text-primary">
                {averagingType}
              </span>
            </div>
          </div>
        </div>
      )}

      <button type="submit" disabled={loading} className="st-btn-green">
        {loading ? "Adding Position..." : "Add Position"}
      </button>
    </form>
  );
}
