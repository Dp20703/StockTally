import { Modal } from "../../ui/Modal";
import CreateTrade from "./CreateTrade";

const CreateTradeModal = ({ setModal }) => {
  return (
    <Modal title="Create Trade" onClose={() => setModal(false)}>
      <CreateTrade setModal={setModal} />
    </Modal>
  );
};

export default CreateTradeModal;
