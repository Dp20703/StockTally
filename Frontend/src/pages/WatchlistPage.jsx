import { useState } from "react";
import AllWatchlist from "../components/features/watchlist/AllWatchlist";
import CreateWatchlistModal from "../components/features/watchlist/CreateWatchlistModal";
import UpdateWatchlistModal from "../components/features/watchlist/UpdateWatchlistModal";
import Navbar from "../components/layout/Navbar";
import { Divider } from "../components/ui";

export default function WatchlistPage() {
  const [watchlistId, setWatchlistId] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  return (
    <main className="st-page">

      {/* Navbar */}
      <Navbar />

      {/* Controls */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl text-text-primary">
            Watchlist
          </h1>

          <span className="px-3 py-1 rounded-full text-xs border bg-blue-900 text-blue-400 border-blue-border">
            Your Stocks
          </span>
        </div>

        {/* Button */}
        <div className="flex gap-3 w-full md:w-auto">
          <button
            className="st-btn-green flex-1 md:flex-none"
            onClick={() => setModal(true)}
          >
            + New Watchlist
          </button>
        </div>

      </section>

      {/* Divider */}
      <Divider className="mx-4 mb-4" />

      {/* Watchlist Table / Cards */}
      <section className="px-4 pb-10 overflow-x-auto">
        <AllWatchlist
          setUpdateModal={setUpdateModal}
          setWatchlistId={setWatchlistId}
          setModal={setModal}
        />
      </section>

      {/* Modals */}
      {modal && <CreateWatchlistModal setModal={setModal} />}

      {updateModal && (
        <UpdateWatchlistModal
          setUpdateModal={setUpdateModal}
          watchlistId={watchlistId}
        />
      )}

    </main>
  );
}