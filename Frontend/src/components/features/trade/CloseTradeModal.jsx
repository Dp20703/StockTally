import { Modal } from "../../ui/Modal";
import CloseTrade from "./CloseTrade";

export default function CloseTradeModal({ tradeId, setCloseModal }) {
  return (
    <Modal title="Close Trade" onClose={() => setCloseModal(false)} size="lg">
      <CloseTrade tradeId={tradeId} setCloseModal={setCloseModal} />
    </Modal>
  );
}
