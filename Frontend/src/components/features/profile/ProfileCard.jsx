const ProfileCard = ({ user, onEdit, onDeletePic }) => {
  const profileImage =
    user?.profilePic ||
    `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 100,
    )}.jpg`;

  return (
    <div className="st-card p-6 w-full max-w-screen-md flex flex-col items-center gap-4 hover:shadow-lg transition">
      <div className="relative">
        <img
          src={profileImage}
          alt="profile"
          className="w-80 h-80 rounded-full object-cover border"
        />

        <button
          className="absolute bottom-0 right-0 st-btn-ghost text-xs"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>

      <div className="text-center">
        <p className="text-lg">{user?.userName}</p>
        <p className="text-sm text-gray-500">
          {user?.fullName?.firstName} {user?.fullName?.lastName || ""}
        </p>
        <p className="text-sm text-gray-400">{user?.email}</p>
      </div>

      <button className="st-btn-red text-sm" onClick={onDeletePic}>
        Remove Profile Picture
      </button>
    </div>
  );
};

export default ProfileCard;
