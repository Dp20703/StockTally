import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { useModal } from "../../../context/ModalContext";
import { deleteProfilePic } from "../../../services/userService";

const ProfileCard = () => {
  const { openModal } = useModal();
  const { user, setUser } = useAuth();
  const { userName, email, profilePic, fullName = {} } = user || {};

  const profileImage = profilePic || "./images/default_avatar.jpeg";

  const handleDeletePic = async () => {
    try {
      const { user: updatedUser } = await deleteProfilePic();

      setUser(updatedUser);

      toast.success("Profile picture removed");
    } catch {
      toast.error("Failed to delete profile picture");
    }
  };

  return (
    <main className="st-page">
      <section className="p-6 flex justify-center">
        <div className="st-card p-6 w-full max-w-screen-md flex flex-col items-center gap-4 hover:shadow-lg transition">
          <div className="relative">
            <img
              src={profileImage}
              alt="profile"
              className="w-80 h-80 rounded-full object-cover border"
            />

            <button
              className="absolute bottom-0 right-0 st-btn-ghost text-xs"
              onClick={() => openModal("updateProfile")}
            >
              Edit
            </button>
          </div>

          <div className="text-center">
            <p className="text-lg">{userName}</p>

            <p className="text-sm text-gray-500">
              {fullName?.firstName} {fullName?.lastName}
            </p>

            <p className="text-sm text-gray-400">{email}</p>
          </div>

          <button className="st-btn-red text-sm" onClick={handleDeletePic}>
            Remove Profile Picture
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProfileCard;
