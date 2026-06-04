import { Modal } from "../../ui/Modal";
import { AddPosition } from "./AddPosition";

export default function AddPositionModal({ tradeId, setAddPosition }) {
  return (
    <Modal title="Add Position" onClose={() => setAddPosition(false)} size="lg">
      <AddPosition tradeId={tradeId} setAddPosition={setAddPosition} />
    </Modal>
  );
}
