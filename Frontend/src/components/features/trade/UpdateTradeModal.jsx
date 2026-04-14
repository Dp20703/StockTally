import UpdateTrade from "./UpdateTrade";
import {Modal} from "../../ui/Modal";
export default function UpdateTradeModal({ tradeId, setUpdateModal }) {
  return (
    <Modal title="Update Trade" onClose={() => setUpdateModal(false)} size="lg">
      <UpdateTrade tradeId={tradeId} setUpdateModal={setUpdateModal} />
    </Modal>
  );
}
