export const getProfileData = (user) => ({
  profilePic: "",
  userName: user?.userName || "",
  email: user?.email || "",
  fullName: {
    firstName: user?.fullName?.firstName || "",
    lastName: user?.fullName?.lastName || "",
  },
});
