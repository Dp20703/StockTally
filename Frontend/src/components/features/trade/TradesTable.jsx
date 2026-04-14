import TradeCard from "./TradeCard";

export default function TradesTable({
  trades,
  setUpdateModal,
  handleTradeId,
  setCloseModal,
  handleDelete,
  showTrades,
}) {
  const headers = [
    "Stock Name",
    "Symbol",
    "Buy Price",
    "Buy Date",
    "Sell Price",
    "Sell Date",
    ...(showTrades === "open" ? ["Cur. Qty"] : []),
    "Orig. Qty",
    "Type",
    "Entry",
    "Price & Profit",
    ...(showTrades === "open" ? ["Current P&L"] : []),
    "Final P&L",
    "Status",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-text-secondary border-collapse">
        {/* Header */}
        <thead className="bg-bg-overlay text-text-muted text-xs uppercase divide-y divide-bg-border">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left border-b border-bg-border whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {trades.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-8 text-text-muted"
              >
                No trades found
              </td>
            </tr>
          ) : (
            trades.map((trade) => (
              <TradeCard
                key={trade._id}
                trade={trade}
                showTrades={showTrades}
                handleTradeId={handleTradeId}
                setUpdateModal={setUpdateModal}
                setCloseModal={setCloseModal}
                handleDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
