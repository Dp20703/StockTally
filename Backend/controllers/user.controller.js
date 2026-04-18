const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const BlacklistTokenModel = require('../models/blacklistToken.model');
const { cloudinary } = require('../middlewares/cloudinary');
const { sendWelcomeEmail } = require('../utils/mailer');

//this controller function will register the user using required fields:
module.exports.registerUser = async (req, res) => {
    try {
        // Extract user details
        const { userName, fullName, email, password } = req.body;

        // Check if user already exist
        const [existingEmail, existingUsername] = await Promise.all([
            userModel.findOne({ email }),
            userModel.findOne({ userName }),
        ]);

        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        if (existingUsername) {
            return res.status(410).json({ message: 'Username already exists' });
        }

        //converting the password into hashPassword:
        const hashPassword = await userModel.hashPassword(password);

        //creating user using userService:
        const user = await userService.createUser({
            userName,
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword
        });

        sendWelcomeEmail({
            to: user.email,
            firstName: user.fullName.firstName,
            fullName: `${user.fullName.firstName} ${user.fullName.lastName}`,
            userName: user.userName,
            email: user.email,
        }).catch((err) =>
            console.error("[Mailer] Welcome email failed:", err.message)
        );

        // console.log("user:", user);

        //generating a token using user's id: 
        const token = await user.generateAuthToken();

        //set the token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        /* ── Strip password before sending ── */
        const { password: _pw, ...safeUser } = user.toObject();

        return res.status(201).json({
            message: "Registration successful! Welcome to StockTally.",
            token,
            user: safeUser,
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }

}

// this controller function will login the user using email and password:
module.exports.loginUser = async (req, res) => {
    try {  //extracting email and password from the request body:
        const { email, password } = req.body;
        //login user using userService:
        const { user, token } = await userService.loginUser(email, password);

        //set the token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        //remove the password from the response
        user.password = undefined;

        //return the response
        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Login failed"
        });
    }
}
// this controller function will login the user using googleAuth:
module.exports.googleAuthController = async (req, res) => {
    try {
        const { name, email, photo } = req.body;

        if (!email || !name) {
            return res.status(400).json({
                message: "Name and Email are required",
            });
        }

        let user = await userModel.findOne({ email });

        // If user doesn't exist → create
        if (!user) {
            user = await userModel.create({
                email,
                profilePic: photo,
                isGoogleUser: true,
                userName: email.split("@")[0],
                fullName: {
                    firstName: name,
                },
            });

            // Send welcome email (safe + awaited)
            try {
                const fullName = user.fullName.lastName
                    ? `${user.fullName.firstName} ${user.fullName.lastName}`
                    : user.fullName.firstName;

                await sendWelcomeEmail({
                    to: user.email,
                    firstName: user.fullName.firstName,
                    fullName,
                    userName: user.userName,
                    email: user.email,
                });
            } catch (err) {
                console.error("[Mailer] Welcome email failed:", err.message);
            }

        } else {
            // Update profile pic if changed
            user.profilePic = photo || user.profilePic;
            await user.save();
        }

        // Generate token
        const token = user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        // ✅ Remove sensitive data
        user.password = undefined;

        return res.status(200).json({
            message: "Google login successful",
            token,
            user,
        });

    } catch (error) {
        console.error("Google Auth Error:", error);

        return res.status(500).json({
            message: error.message || "Google login failed",
        });
    }
};

//this controller function will get the user profile using user's id:
module.exports.getUserProfile = async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
}

//this controller function will update the user profile:
module.exports.updateProfile = async (req, res) => {
    try {
        const { userName, email, fullName } = req.body;

        if (!userName || !email || !fullName?.firstName) {
            return res.status(400).json({
                message: "Username, email, and first name are required",
            });
        }

        const updatedUser = await userService.updateProfile({
            userId: req.user._id,
            userName,
            email,
            fullName,
            file: req.file ?? null,
        });

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (err) {
        // Surface known conflict errors as 409, everything else as 500
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        console.error("Update profile error:", err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
// this controller function will delete the user profile pic:
module.exports.deleteProfilePic = async (req, res) => {
    try {
        const user = await userService.deleteProfilePic(req.user._id);

        return res.status(200).json({
            message: "Profile picture deleted successfully",
            user,
        });

    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        console.error("Delete profile pic error:", err);
        return res.status(500).json({ message: "Failed to delete profile picture" });
    }
};

//this controller function will logout the user:
module.exports.logoutUser = async (req, res) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    try {
        if (token) {
            const exists = await BlacklistTokenModel.exists({ token });
            if (!exists) await BlacklistTokenModel.create({ token });
        }

        res.clearCookie("token");
        return res.status(200).json({ message: "User logout successful" });

    } catch (error) {
        console.error("[Auth] Logout error:", error);
        return res.status(500).json({ message: "Error logging out" });
    }
};
