export const validateProfile = (data) => {
  const errors = {};

  if (!data.fullName.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.userName?.trim()) {
    errors.userName = "Username is required";
  } else if (data.userName.length < 3) {
    errors.userName = "Username must be at least 3 characters";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  return errors;
};
