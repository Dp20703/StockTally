import { useEffect, useState } from "react";

const UpdateProfileForm = ({ initialData, onSubmit, loading }) => {
  const [data, setData] = useState({
    profilePic: "",
    userName: "",
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
    ...initialData,
  });

  const [preview, setPreview] = useState(initialData?.profilePic || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData({
      profilePic: "",
      userName: "",
      email: "",
      fullName: {
        firstName: "",
        lastName: "",
      },
      ...initialData,
    });

    setPreview(initialData?.profilePic || "");
    setErrors({});
  }, [initialData]);

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!data.fullName.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!data.userName?.trim()) {
      newErrors.userName = "Username is required";
    } else if (data.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    }

    if (!data.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    return newErrors;
  };

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

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Submit
  const submitHandler = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(data);
  };

  // Check if anything changed
  const isChanged =
    JSON.stringify({
      ...data,
      profilePic: data.profilePic instanceof File ? "file" : data.profilePic,
    }) !==
    JSON.stringify({
      ...initialData,
      profilePic: initialData?.profilePic || "",
    });

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
        value={data.fullName.firstName || ""}
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
        value={data.fullName.lastName || ""}
        onChange={handleChange}
        placeholder="Last Name"
        className="st-input"
      />

      {/* Username */}
      <input
        name="userName"
        value={data.userName || ""}
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
        value={data.email || ""}
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
