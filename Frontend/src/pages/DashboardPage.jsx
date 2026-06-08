import AllTrades from "components/features/trade/AllTrades";
import { Divider } from "components/ui";
import useModal from "../hooks/useModal";
import useTrade from "../hooks/useTrade";

export default function Dashboard() {
  const { openModal } = useModal();

  const { status, setStatus } = useTrade();

  // two sections: active (open+partial) and closed
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
            onClick={() => openModal("createTrade")}
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
        <AllTrades />
      </section>
    </main>
  );
}
