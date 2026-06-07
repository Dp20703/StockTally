import api from "./apiClient";

export const updateProfile = async (formData) => {
  const res = await api.put("/users/update_profile", formData);

  return res.data;
};

export const deleteProfilePic = async () => {
  const res = await api.delete("/users/delete_profile_pic");

  return res.data;
};
