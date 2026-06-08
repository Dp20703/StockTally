import AllWatchlist from "components/features/watchlist/AllWatchlist";
import { Divider } from "components/ui";
import useModal from "hooks/useModal";

export default function WatchlistPage() {
  const { openModal } = useModal();

  return (
    <main className="st-page">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl text-text-primary">Watchlist</h1>

          <span className="px-3 py-1 rounded-full text-xs border bg-blue-900 text-blue-400 border-blue-border">
            Your Stocks
          </span>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            className="st-btn-green flex-1 md:flex-none"
            onClick={() => openModal("createWatchlist")}
          >
            + New Watchlist
          </button>
        </div>
      </section>

      <Divider className="mx-4 mb-4" />

      <section className="px-4 pb-10 overflow-x-auto">
        <AllWatchlist />
      </section>
    </main>
  );
}
