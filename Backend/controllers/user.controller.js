const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const BlacklistTokenModel = require('../models/blacklistToken.model');

//this controller function will register the user using required fields:
module.exports.registerUser = async (req, res) => {
    try {
        // Extract user details
        const { userName, fullName, email, password } = req.body;

        // Check if user already exist
        const isUserAlreadyExist = await userModel.findOne({ email, userName });
        if (isUserAlreadyExist) {
            return res.status(409).json({ message: 'User already exist' })
        }
        const isUserNameAlreadyExist = await userModel.findOne({ userName });
        if (isUserNameAlreadyExist) {
            return res.status(410).json({ message: 'User already exist' })
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
        console.log("user:", user);

        //generating a token using user's id: 
        const token = await user.generateAuthToken();
        res.status(200).json({ message: 'User registered successfully', token, user });

    } catch (error) {
        console.log("Error is register_user controller:", error);
        res.status(500).json({ error: error.message });
    }


}

// this controller function will login the user using email and password:
module.exports.loginUser = async (req, res) => {
    //extracting email and password from the request body:
    const { email, password } = req.body;
    //login user using userService:
    const { user, token } = await userService.loginUser(email, password);
    //set the token as a cookie
    res.cookie('token', token);

    //remove the password from the response
    user.password = undefined;

    //return the response
    res.status(200).json({ message: "Login successful", token, user });
}

//this controller function will get the user profile using user's id:
module.exports.getUserProfile = async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
}

//this controller function will update the user profile:
module.exports.updateProfile = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { userName, email, fullName } = req.body;

        // Validate required fields
        if (!userName || !email || !fullName?.firstName) {
            return res.status(400).json({ message: "Username, email, and first name are required" });
        }

        const updateData = {
            userName: userName.trim(),
            email: email.trim(),
            fullName: {
                firstName: fullName.firstName.trim(),
                lastName: fullName.lastName?.trim() || ""  // Optional
            },
        };

        // Update profile picture
        if (req.file) {
            updateData.profilePic = `images/uploads/${req.file.filename}`;
        }

        const existingEmail = await userModel.findOne({ email: updateData.email, _id: { $ne: req.user._id } });
        if (existingEmail) {
            return res.status(409).json({ message: "Email already exist" });
        }

        const existingUsername = await userModel.findOne({ userName: updateData.userName, _id: { $ne: req.user._id } });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exist" });
        }

        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true }
        );

        return res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

//this controller function will logout the user:
module.exports.logoutUser = async (req, res) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];

        if (token) {
            // Check if token is already blacklisted to avoid duplicate key error
            const alreadyBlacklisted = await BlacklistTokenModel.findOne({ token });

            if (!alreadyBlacklisted) {
                // Store token in blacklist with auto-expiry (handled by schema)
                await BlacklistTokenModel.create({ token });
            }
        }

        // Clear token cookie
        res.clearCookie('token');

        return res.status(200).json({ message: "User logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Error logging out", error });
    }
};
