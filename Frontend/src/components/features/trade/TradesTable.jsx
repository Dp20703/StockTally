import TradeCard from "./TradeCard";

export default function TradesTable({
  trades,
  setUpdateModal,
  handleTradeId,
  setCloseModal,
  handleDelete,
  setAddPosition
}) {
  return (
    <div className="st-table-wrapper">
      <table className="st-table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Qty</th>
            <th>P/L</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {trades?.map((trade) => (
            <TradeCard
              key={trade._id}
              trade={trade}
              handleTradeId={handleTradeId}
              setUpdateModal={setUpdateModal}
              setCloseModal={setCloseModal}
              handleDelete={handleDelete}
              setAddPosition={setAddPosition}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
