export default function AddStockForm({
  stocks,
  handleChange,
  handleAdd,
  handleRemove,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-3">
        {stocks.map((stock, index) => (
          <div key={index} className="st-card p-3 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-sm text-text-muted">Stock {index + 1}</span>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-400"
              >
                ✕
              </button>
            </div>

            <input
              name="stockName"
              value={stock.stockName}
              onChange={(e) => handleChange(e, index)}
              className="st-input"
              placeholder="Stock name"
            />

            <input
              name="stockSymbol"
              value={stock.stockSymbol}
              onChange={(e) => handleChange(e, index)}
              className="st-input"
              placeholder="Stock symbol"
            />
          </div>
        ))}
      </div>

      <button type="button" onClick={handleAdd} className="st-btn-ghost">
        + Add Another
      </button>

      <button type="submit" className="st-btn-green">
        Submit Stocks
      </button>
    </form>
  );
}
