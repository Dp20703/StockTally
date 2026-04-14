import UpdateWatchlist from "./UpdateWatchlist";
import {Modal} from "../../ui/Modal";

export default function UpdateWatchlistModal({
  setUpdateModal,
  watchlistId,
}) {
  return (
    <Modal
      title="Update Watchlist"
      onClose={() => setUpdateModal(false)}
      size="md"
    >
      <UpdateWatchlist
        setUpdateModal={setUpdateModal}
        watchlistId={watchlistId}
      />
    </Modal>
  );
}