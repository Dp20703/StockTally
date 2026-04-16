import { Modal } from "../../ui/Modal";
import AddStockForm from "./AddStockForm";

export default function AddStockModal({
  setAddStockModal,
  stocks,
  handleChange,
  handleAdd,
  handleRemove,
  handleSubmit,
}) {
  return (
    <Modal title="Add Stocks" onClose={() => setAddStockModal(false)}>
      <AddStockForm
        stocks={stocks}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
}
