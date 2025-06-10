const userModel = require("../models/user.model");
const BlacklistTokenModel = require("../models/blacklistToken.model");
const jwt = require('jsonwebtoken');

// this middleware will check if the user is authenticated or not
module.exports.authUser = async (req, res, next) => {
    //getting the token from the request:
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    //if token is not found it will return unauthorized:
    if (!token) {
        // console.log("token not found")
        return res.status(401).json({ message: "Unauthorized" })
    }

    //check if token is blacklisted:
    const isTokenBlacklisted = await BlacklistTokenModel.findOne({ token: token });
    // console.log(isTokenBlacklisted)
    if (isTokenBlacklisted) {
        // console.log("blacklisted token")
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        //verifying the token:
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //getting the user from the token using user's id:
        const user = await userModel.findById(decoded._id);
        // // console.log("user from middleware:", user);
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
        }
        //setting the user in the request:
        req.user = user;
        return next();
    } catch (error) {
        // console.log("Auth middleware error:", error);
        return res.status(401).json({ message: "Unauthorized" })
    }
}