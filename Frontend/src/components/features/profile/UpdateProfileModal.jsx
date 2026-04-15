import { Modal } from "../../ui/Modal";
import UpdateProfileForm from "./UpdateProfileForm";

export const UpdateProfileModal = ({
  setUpdateModal,
  userData,
  handleUpdate,
  loading,
}) => {
  return (
    <Modal
      title="Update Profile"
      size="lg"
      onClose={() => setUpdateModal(false)}
    >
      <UpdateProfileForm
        initialData={userData}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </Modal>
  );
};
