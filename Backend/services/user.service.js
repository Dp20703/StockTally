const userModel = require('../models/user.model');

// this function is used to create a user:
module.exports.createUser = async ({ userName, firstName, lastName, email, password }) => {
    console.log("User service function for create user");
    if (!userName || !firstName || !lastName || !email || !password) {
        throw new Error('All fields are required');
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

// this function is used to login a user:
module.exports.loginUser = async (email, password) => {
    console.log("User service function for login user");
    if (!email || !password) {
        throw new Error('All fields are required');
    }
    //selecting the password:
    //user from login service:
    const user = await userModel.findOne({ email }).select('+password');

    //if user is not found it will return invalid email or password:
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    //comparing the password:
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    //generating a token:
    const token = user.generateAuthToken();
    console.log("token from login function:", token);
    //returning the user and token:
    return { user, token }
}