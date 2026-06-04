import TradeMobileCard from "./TradeMobileCard";

export function TradesMobile({
  trades,
  handleTradeId,
  setUpdateModal,
  setCloseModal,
  handleDelete,
  setAddPosition,
}) {
  return (
    <div className="flex flex-col gap-3">
      {trades.map((trade) => (
        <TradeMobileCard
          key={trade._id}
          trade={trade}
          handleTradeId={handleTradeId}
          setUpdateModal={setUpdateModal}
          setCloseModal={setCloseModal}
          handleDelete={handleDelete}
          setAddPosition={setAddPosition}
        />
      ))}
    </div>
  );
}
