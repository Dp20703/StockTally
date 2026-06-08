import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "../../../services/userService";
import { getProfileData } from "../../../utils/profileHelpers";
import { validateProfile } from "../../../utils/profileValidation";
import useAuth from "../../../hooks/useAuth";
import useModal from "../../../hooks/useModal";

const UpdateProfileForm = () => {
  const { user, setUser } = useAuth();
  const { closeModal } = useModal();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(getProfileData(user));

  const [preview, setPreview] = useState(user?.profilePic || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData(getProfileData(user));
    setPreview(user?.profilePic || "");
    setErrors({});
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      setData((prev) => ({
        ...prev,
        fullName: {
          ...prev.fullName,
          [name]: value,
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle image upload
  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        profilePic: "Only image files allowed",
      }));

      return;
    }

    setData((prev) => ({
      ...prev,
      profilePic: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateProfile(data);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("fullName[firstName]", data.fullName.firstName);
      formData.append("fullName[lastName]", data.fullName.lastName);

      if (data.profilePic instanceof File) {
        formData.append("profilePic", data.profilePic);
      }

      const { user: updatedUser } = await updateProfile(formData);

      setUser(updatedUser);
      toast.success("Profile updated");
      closeModal();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Check if anything changed
  const isChanged = useMemo(() => {
    return (
      data.userName !== user?.userName ||
      data.email !== user?.email ||
      data.fullName.firstName !== user?.fullName?.firstName ||
      data.fullName.lastName !== user?.fullName?.lastName ||
      data.profilePic instanceof File
    );
  }, [data, user]);

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4">
      {/* Preview */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
      )}

      {/* First Name */}
      <input
        name="firstName"
        value={data?.fullName?.firstName || ""}
        onChange={handleChange}
        placeholder="First Name"
        className="st-input"
      />
      {errors.firstName && (
        <p className="text-red-500 text-sm">{errors.firstName}</p>
      )}

      {/* Last Name */}
      <input
        name="lastName"
        value={data?.fullName?.lastName || ""}
        onChange={handleChange}
        placeholder="Last Name"
        className="st-input"
      />

      {/* Username */}
      <input
        name="userName"
        value={data?.userName || ""}
        onChange={handleChange}
        placeholder="Username"
        className="st-input"
      />
      {errors.userName && (
        <p className="text-red-500 text-sm">{errors.userName}</p>
      )}

      {/* Email */}
      <input
        name="email"
        value={data?.email || ""}
        onChange={handleChange}
        placeholder="Email"
        className="st-input"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      {/* File Upload */}
      <input
        type="file"
        onChange={(e) => handleFile(e.target.files[0])}
        className="st-input"
      />
      {errors.profilePic && (
        <p className="text-red-500 text-sm">{errors.profilePic}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="st-btn-green hover:scale-105 transition"
        disabled={loading || !isChanged}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default UpdateProfileForm;
