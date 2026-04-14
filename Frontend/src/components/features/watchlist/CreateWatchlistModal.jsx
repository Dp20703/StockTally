import { Modal } from "../../ui/Modal";
import CreateWatchlist from "./CreateWatchlist";

export default function CreateWatchlistModal({ setModal }) {
  return (
    <Modal title="Create Watchlist" onClose={() => setModal(false)} size="lg">
      <CreateWatchlist setModal={setModal} />
    </Modal>
  );
}
