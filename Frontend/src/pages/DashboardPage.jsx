import { useState } from "react";
import AllTrades from "components/features/trade/AllTrades";
import UpdateTradeModal from "components/features/trade/UpdateTradeModal";
import CloseTradeModal from "components/features/trade/CloseTradeModal";
import CreateTradeModal from "components/features/trade/CreateTradeModal";
import { Divider } from "components/ui";
import { useTrades } from "context/TradeContext";
import AddPositionModal from "../components/features/trade/AddPositionModal";

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [addPosition, setAddPosition] = useState(false);
  const [tradeId, setTradeId] = useState(null);

  const { status, setStatus } = useTrades();

  const handleTradeId = (id) => setTradeId(id);

  // ✅ Only two sections: active (open+partial) and closed
  const isActive = status !== "closed";

  const toggle = () => setStatus(isActive ? "closed" : "open");

  return (
    <main className="st-page">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl text-text-primary">Dashboard</h1>
          <span
            className={`px-3 py-1 rounded-full text-xs border ${
              isActive
                ? "bg-green-900 text-green-400 border-green-border"
                : "bg-red-900 text-red-400 border-red-border"
            }`}
          >
            {isActive ? "Open & Partial Trades" : "Closed Trades"}
          </span>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            className="st-btn-green flex-1 md:flex-none"
            onClick={() => setModal(true)}
          >
            + New Trade
          </button>
          <button
            className={`flex-1 md:flex-none ${isActive ? "st-btn-red" : "st-btn-green"}`}
            onClick={toggle}
          >
            {isActive ? "View Closed" : "View Open"}
          </button>
        </div>
      </section>

      <Divider className="mx-4 mb-4" />

      <section className="px-4 pb-10">
        <AllTrades
          handleTradeId={handleTradeId}
          setUpdateModal={setUpdateModal}
          setCloseModal={setCloseModal}
          setAddPosition={setAddPosition}
        />
      </section>

      {modal && <CreateTradeModal setModal={setModal} />}
      {updateModal && (
        <UpdateTradeModal tradeId={tradeId} setUpdateModal={setUpdateModal} />
      )}
      {closeModal && (
        <CloseTradeModal tradeId={tradeId} setCloseModal={setCloseModal} />
      )}
      {addPosition && (
        <AddPositionModal tradeId={tradeId} setAddPosition={setAddPosition} />
      )}
    </main>
  );
}
