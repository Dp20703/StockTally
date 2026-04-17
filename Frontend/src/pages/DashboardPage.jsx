import { useState } from "react";
import AllTrades from "components/features/trade/AllTrades";
import UpdateTradeModal from "components/features/trade/UpdateTradeModal";
import CloseTradeModal from "components/features/trade/CloseTradeModal";
import CreateTradeModal from "components/features/trade/CreateTradeModal";
import { Divider } from "components/ui";

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [tradeId, setTradeId] = useState(null);
  const [showTrades, setShowTrades] = useState("open");

  const handleTradeId = (id) => setTradeId(id);

  const toggleTrades = () =>
    setShowTrades((prev) => (prev === "open" ? "closed" : "open"));

  const isClosed = showTrades === "closed";

  return (
    <main className="st-page">
      {/* Controls */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl text-text-primary">Dashboard</h1>

          <span
            className={`px-3 py-1 rounded-full text-xs border ${
              isClosed
                ? "bg-red-900 text-red-400 border-red-border"
                : "bg-green-900 text-green-400 border-green-border"
            }`}
          >
            {isClosed ? "Closed Trades" : "Open Trades"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full md:w-auto">
          <button
            className="st-btn-green flex-1 md:flex-none"
            onClick={() => setModal(true)}
          >
            + New Trade
          </button>

          <button
            className={`flex-1 md:flex-none ${
              isClosed ? "st-btn-green" : "st-btn-red"
            }`}
            onClick={toggleTrades}
          >
            {isClosed ? "View Open" : "View Closed"}
          </button>
        </div>
      </section>

      {/* Divider */}
      <Divider className="mx-4 mb-4" />

      {/* Trades Table */}
      <section className="px-4 pb-10 overflow-x-auto">
        <AllTrades
          handleTradeId={handleTradeId}
          setUpdateModal={setUpdateModal}
          setCloseModal={setCloseModal}
          showTrades={showTrades}
        />
      </section>
      {/* Modals */}
      {modal && <CreateTradeModal setModal={setModal} />}
      {updateModal && (
        <UpdateTradeModal tradeId={tradeId} setUpdateModal={setUpdateModal} />
      )}
      {closeModal && (
        <CloseTradeModal tradeId={tradeId} setCloseModal={setCloseModal} />
      )}
    </main>
  );
}
