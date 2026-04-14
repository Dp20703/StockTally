import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import api from "../services/apiClient";
import { Modal } from "../components/ui/Modal";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [updateModal, setUpdateModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    profilePic: "",
    userName: "",
    fullName: { firstName: "", lastName: "" },
    email: "",
  });

  useEffect(() => {
    if (!user) return;

    setData({
      profilePic: user.profilePic || "",
      userName: user.userName || "",
      fullName: {
        firstName: user.fullName?.firstName || "",
        lastName: user.fullName?.lastName || "",
      },
      email: user.email || "",
    });

    setPreviewImage(user.profilePic || "");
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    if (["firstName", "lastName"].includes(name)) {
      setData((prev) => ({
        ...prev,
        fullName: { ...prev.fullName, [name]: value },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfilePicChange = ({ target }) => {
    const file = target.files[0];
    if (!file) return;

    setData((prev) => ({ ...prev, profilePic: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDeletePic = async () => {
    try {
      const res = await api.delete("/users/delete_profile_pic");
      setUser(res?.data?.user);
      setPreviewImage("");
      toast.success("Profile picture removed", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch {
      toast.error("Failed to delete profile picture");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("profilePic", data.profilePic);
    formData.append("fullName[firstName]", data.fullName.firstName);
    formData.append("fullName[lastName]", data.fullName.lastName);

    setLoading(true);

    try {
      const res = await api.put("/users/update_profile", formData);
      setUser(res?.data?.user);
      setUpdateModal(false);
      toast.success("Profile updated", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const profileImage =
    previewImage ||
    user?.profilePic ||
    `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;

  return (
    <main className="st-page">
      <Navbar />

      {/* Profile Card */}
      <section className="p-6 flex justify-center">
        <div className="st-card p-6 w-full max-w-md flex flex-col items-center gap-4 hover:shadow-lg transition duration-200">
          {/* Image */}
          <div className="relative">
            <img
              src={profileImage}
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border border-bg-border"
            />

            <button
              className="absolute bottom-0 right-0 st-btn-ghost text-xs"
              onClick={() => setUpdateModal(true)}
            >
              Edit
            </button>
          </div>

          {/* Info */}
          <div className="text-center flex flex-col gap-1">
            <p className="text-lg text-text-primary">{user?.userName}</p>
            <p className="text-text-muted">
              {user?.fullName?.firstName} {user?.fullName?.lastName}
            </p>
            <p className="text-text-muted text-sm">{user?.email}</p>
          </div>

          {/* Actions */}
          <button className="st-btn-red text-sm" onClick={handleDeletePic}>
            Remove Profile Picture
          </button>
        </div>
      </section>

      {/* Update Modal */}
      {updateModal && (
        <Modal title="Update Profile" onClose={() => setUpdateModal(false)}>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              name="firstName"
              value={data.fullName.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="st-input"
            />

            <input
              name="lastName"
              value={data.fullName.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="st-input"
            />

            <input
              name="userName"
              value={data.userName}
              onChange={handleChange}
              placeholder="Username"
              className="st-input"
            />

            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              className="st-input"
            />

            <input
              type="file"
              onChange={handleProfilePicChange}
              className="st-input"
            />

            <button
              type="submit"
              className="st-btn-green hover:scale-105 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </Modal>
      )}
    </main>
  );
}
