import { modalConfig } from "./modalConfig";
import { Modal } from "../../ui";
import useModal from "../../../hooks/useModal";

export default function ModalManager() {
  const { modal, closeModal } = useModal();

  if (!modal) return null;

  const config = modalConfig[modal.type];

  if (!config) return null;

  const Component = config.component;

  return (
    <Modal title={config.title} size={config.size} onClose={closeModal}>
      <Component {...modal.props} closeModal={closeModal} />
    </Modal>
  );
}
