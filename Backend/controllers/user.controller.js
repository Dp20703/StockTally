const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const BlacklistTokenModel = require('../models/blacklistToken.model');
const { sendWelcomeEmail } = require('../utils/mailer');

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
};

function handleError(res, err, fallbackMessage) {
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    console.error(fallbackMessage, err);
    return res.status(500).json({ message: 'Internal server error.' });
}

// ─── registerUser ─────────────────────────────────────────────────────────────

module.exports.registerUser = async (req, res) => {
    try {
        const { userName, fullName, email, password } = req.body;

        const [existingEmail, existingUsername] = await Promise.all([
            userModel.findOne({ email }),
            userModel.findOne({ userName }),
        ]);

        if (existingEmail) return res.status(409).json({ message: 'Email already exists' });
        if (existingUsername) return res.status(409).json({ message: 'Username already exists' });

        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            userName,
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword,
        });

        sendWelcomeEmail({
            to: user.email,
            firstName: user.fullName.firstName,
            fullName: `${user.fullName.firstName} ${user.fullName.lastName}`,
            userName: user.userName,
            email: user.email,
        }).catch(err => console.error('[Mailer] Welcome email failed:', err.message));

        const token = user.generateAuthToken();
        res.cookie('token', token, COOKIE_OPTIONS);

        const { password: _pw, ...safeUser } = user.toObject();
        return res.status(201).json({
            message: 'Registration successful! Welcome to StockTally.',
            token,
            user: safeUser,
        });

    } catch (err) {
        return handleError(res, err, 'Registration error:');
    }
};

// ─── loginUser ────────────────────────────────────────────────────────────────

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);

        res.cookie('token', token, COOKIE_OPTIONS);
        user.password = undefined;

        return res.status(200).json({ message: 'Login successful', token, user });

    } catch (err) {
        return handleError(res, err, 'Login error:');
    }
};

// ─── googleAuthController ─────────────────────────────────────────────────────

module.exports.googleAuthController = async (req, res) => {
    try {
        const { name, email, photo } = req.body;
        const { user, token, isNewUser } = await userService.googleAuth({ name, email, photo });

        if (isNewUser) {
            const fullName = user.fullName.lastName
                ? `${user.fullName.firstName} ${user.fullName.lastName}`
                : user.fullName.firstName;

            sendWelcomeEmail({
                to: user.email,
                firstName: user.fullName.firstName,
                fullName,
                userName: user.userName,
                email: user.email,
            }).catch(err => console.error('[Mailer] Welcome email failed:', err.message));
        }

        res.cookie('token', token, COOKIE_OPTIONS);
        return res.status(200).json({ message: 'Google login successful', token, user });

    } catch (err) {
        return handleError(res, err, 'Google auth error:');
    }
};

// ─── getUserProfile ───────────────────────────────────────────────────────────

module.exports.getUserProfile = (req, res) => {
    return res.status(200).json(req.user);
};

// ─── updateProfile ────────────────────────────────────────────────────────────

module.exports.updateProfile = async (req, res) => {
    try {
        const { userName, email, fullName } = req.body;

        const updatedUser = await userService.updateProfile({
            userId: req.user._id,
            userName,
            email,
            fullName,
            file: req.file ?? null,
        });

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser,
        });

    } catch (err) {
        return handleError(res, err, 'Update profile error:');
    }
};

// ─── deleteProfilePic ─────────────────────────────────────────────────────────

module.exports.deleteProfilePic = async (req, res) => {
    try {
        const user = await userService.deleteProfilePic(req.user._id);

        return res.status(200).json({
            message: 'Profile picture deleted successfully',
            user,
        });

    } catch (err) {
        return handleError(res, err, 'Delete profile pic error:');
    }
};

// ─── logoutUser ───────────────────────────────────────────────────────────────

module.exports.logoutUser = async (req, res) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

    try {
        if (token) {
            const exists = await BlacklistTokenModel.exists({ token });
            if (!exists) await BlacklistTokenModel.create({ token });
        }

        res.clearCookie('token', COOKIE_OPTIONS);
        return res.status(200).json({ message: 'Logout successful' });

    } catch (err) {
        console.error('[Auth] Logout error:', err);
        return res.status(500).json({ message: 'Error logging out' });
    }
};
