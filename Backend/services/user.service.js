const userModel = require('../models/user.model');
const { cloudinary } = require('../config/cloudinary');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function httpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}

function extractPublicId(url) {
    if (!url || typeof url !== 'string') return null;

    try {
        const fileName = url.split('/').pop().split('.')[0];
        return `stocktally/profile_pics/${fileName}`;
    } catch {
        return null;
    }
}


async function destroyCloudinaryImage(url) {
    try {
        await cloudinary.uploader.destroy(extractPublicId(url));
    } catch (err) {
        console.error('Cloudinary delete error:', err.message);
    }
}

// ─── createUser ───────────────────────────────────────────────────────────────

module.exports.createUser = async ({ userName, firstName, lastName, email, password }) => {
    if (!userName || !firstName || !lastName || !email || !password) {
        throw httpError(400, 'All fields are required');
    }

    const user = await userModel.create({
        userName,
        fullName: { firstName, lastName },
        email,
        password,
        totalProfit: 0,
    });

    return user;
};

// ─── loginUser ────────────────────────────────────────────────────────────────

module.exports.loginUser = async (email, password) => {
    if (!email || !password) {
        throw httpError(400, 'All fields are required');
    }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        throw httpError(401, 'Invalid email or password');
    }

    if (user.isGoogleUser) {
        throw httpError(401, 'Please login using Google');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw httpError(401, 'Invalid email or password');
    }

    const token = user.generateAuthToken();
    return { user, token };
};

// ─── googleAuth ───────────────────────────────────────────────────────────────

module.exports.googleAuth = async ({ name, email, photo }) => {
    let user = await userModel.findOne({ email });
    let isNewUser = false;

    if (!user) {
        user = await userModel.create({
            email,
            profilePic: photo || '',
            isGoogleUser: true,
            userName: email.split('@')[0],
            fullName: { firstName: name, lastName: "" },
        });
        isNewUser = true;
    } else {
        if (photo && photo !== user.profilePic) {
            user.profilePic = photo;
            await user.save();
        }
    }

    const token = user.generateAuthToken();
    user.password = undefined;

    return { user, token, isNewUser };
};

// ─── updateProfile ────────────────────────────────────────────────────────────

module.exports.updateProfile = async ({ userId, userName, email, fullName, file }) => {
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = userName.trim();

    const existingUser = await userModel.findById(userId);
    if (!existingUser) throw httpError(404, 'User not found');

    const [duplicateEmail, duplicateUsername] = await Promise.all([
        normalizedEmail !== existingUser.email
            ? userModel.findOne({ email: normalizedEmail, _id: { $ne: userId } })
            : null,
        normalizedUsername !== existingUser.userName
            ? userModel.findOne({ userName: normalizedUsername, _id: { $ne: userId } })
            : null,
    ]);

    if (duplicateEmail) throw httpError(409, 'Email already exists');
    if (duplicateUsername) throw httpError(409, 'Username already exists');

    const updateData = {
        userName: normalizedUsername,
        email: normalizedEmail,
        fullName: {
            firstName: fullName.firstName.trim(),
            lastName: fullName?.lastName?.trim() || '',
        },
    };

    if (file) {
        if (existingUser.profilePic) {
            await destroyCloudinaryImage(existingUser.profilePic);
        }
        updateData.profilePic = file.path;
    }

    const updatedUser = await userModel
        .findByIdAndUpdate(userId, updateData, { new: true })
        .select('-password');

    return updatedUser;
};

// ─── deleteProfilePic ─────────────────────────────────────────────────────────

module.exports.deleteProfilePic = async (userId) => {
    const user = await userModel.findById(userId);

    if (!user) throw httpError(404, 'User not found');
    if (!user.profilePic) throw httpError(400, 'No profile picture to delete');

    await destroyCloudinaryImage(user.profilePic);

    user.profilePic = '';
    await user.save();

    user.password = undefined;
    return user;
};
