import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import api from "../services/apiClient";
import ProfileCard from "../components/features/profile/ProfileCard";
import { UpdateProfileModal } from "../components/features/profile/UpdateProfileModal";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (formValues) => {
    const formData = new FormData();

    formData.append("userName", formValues.userName);
    formData.append("email", formValues.email);

    if (formValues.profilePic instanceof File) {
      formData.append("profilePic", formValues.profilePic);
    }

    formData.append("fullName[firstName]", formValues.fullName.firstName);
    formData.append("fullName[lastName]", formValues.fullName.lastName);

    setLoading(true);

    try {
      const res = await api.put("/users/update_profile", formData);
      setUser(res?.data?.user);
      setUpdateModal(false);

      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePic = async () => {
    try {
      const res = await api.delete("/users/delete_profile_pic");
      setUser(res?.data?.user);
      toast.success("Profile picture removed");
    } catch {
      toast.error("Failed to delete profile picture");
    }
  };

  return (
    <main className="st-page">
      <Navbar />

      <section className="p-6 flex justify-center">
        <ProfileCard
          user={user}
          onEdit={() => setUpdateModal(true)}
          onDeletePic={handleDeletePic}
        />
      </section>

      {updateModal && (
        <UpdateProfileModal
          setUpdateModal={setUpdateModal}
          userData={user}
          handleUpdate={handleUpdate}
          loading={loading}
        />
      )}
    </main>
  );
}
