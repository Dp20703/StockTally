const { cloudinary } = require('../middlewares/cloudinary');
const userModel = require('../models/user.model');

// Creates a typed error that the controller maps to an HTTP status code.
function httpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}

// Extracts the Cloudinary public_id from a stored URL.
// e.g. "https://res.cloudinary.com/.../profile_pics/abc123.jpg"
//   →  "profile_pics/abc123"
function extractPublicIdFromUrl(url) {
    const urlParts = url.split('/');
    const fileWithExt = urlParts[urlParts.length - 1];
    return 'profile_pics/' + fileWithExt.split('.')[0];
}

// ─── createUser ────────────────────────────────────────────────────────────
module.exports.createUser = async ({ userName, firstName, lastName, email, password }) => {
    if (!userName || !firstName || !lastName || !email || !password) {

        throw new httpError(400, 'All fields are required');
    }
    const user = await userModel.create({
        userName,
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        totalProfit: 0
    })

    return user;
}

// ─── loginUser ────────────────────────────────────────────────────────────
module.exports.loginUser = async (email, password) => {
    // console.log("User service function for login user");
    if (!email || !password) {
        throw new httpError(400, 'All fields are required');
    }
    //selecting the password:
    //user from login service:
    const user = await userModel.findOne({ email }).select('+password');

    //if user is not found it will return invalid email or password:
    if (!user) {
        throw new httpError(401, 'Invalid email or password');
    }

    // Use googleAuth prevention
    if (user.isGoogleUser) {
        throw new httpError(401, "Please login using Google");
    }

    //comparing the password:
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        //if password is not match it will return invalid email or password:
        throw new httpError(401, 'Invalid email or password');
    }
    //generating a token:
    const token = user.generateAuthToken();

    //returning the user and token:
    return { user, token }
}

// ─── updateProfile ────────────────────────────────────────────────────────────
module.exports.updateProfile = async ({ userId, userName, email, fullName, file }) => {

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = userName.trim();

    // 1. Fetch current user
    const existingUser = await userModel.findById(userId);
    if (!existingUser) throw httpError(404, "User not found");

    // 2. Duplicate checks — only query when the value actually changed, run in parallel
    const [duplicateEmail, duplicateUsername] = await Promise.all([
        normalizedEmail !== existingUser.email
            ? userModel.findOne({ email: normalizedEmail, _id: { $ne: userId } })
            : null,
        normalizedUsername !== existingUser.userName
            ? userModel.findOne({ userName: normalizedUsername, _id: { $ne: userId } })
            : null,
    ]);

    if (duplicateEmail) throw httpError(409, "Email already exists");
    if (duplicateUsername) throw httpError(409, "Username already exists");

    // 3. Build the update payload
    const updateData = {
        userName: normalizedUsername,
        email: normalizedEmail,
        fullName: {
            firstName: fullName.firstName.trim(),
            lastName: fullName?.lastName?.trim() || "",
        },
    };

    // 4. New profile pic uploaded — delete old one from Cloudinary first
    if (file) {
        if (existingUser.profilePic) {
            try {
                // extractPublicIdFromUrl parses the Cloudinary URL stored in DB
                // to get "profile_pics/<id>" which is what uploader.destroy expects
                const oldPublicId = extractPublicIdFromUrl(existingUser.profilePic);
                await cloudinary.uploader.destroy(oldPublicId);
            } catch (err) {
                // Non-fatal: log and continue so the upload isn't blocked
                console.error("Cloudinary delete error (old pic):", err.message);
            }
        }
        // file.path is the full Cloudinary HTTPS URL set by multer-storage-cloudinary
        updateData.profilePic = file.path;
    }

    // 5. Persist and return without password
    const updatedUser = await userModel
        .findByIdAndUpdate(userId, updateData, { new: true })
        .select('-password');

    return updatedUser;
};

// ─── deleteProfilePic ─────────────────────────────────────────────────────────
module.exports.deleteProfilePic = async (userId) => {

    const user = await userModel.findById(userId);

    if (!user) throw httpError(404, "User not found");
    if (!user.profilePic) throw httpError(400, "No profile picture to delete");

    const publicId = extractPublicIdFromUrl(user.profilePic);
    await cloudinary.uploader.destroy(publicId);

    user.profilePic = '';
    await user.save();

    user.password = undefined;
    return user;
};
