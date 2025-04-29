const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');

//this controller function will register the user using required fields:
module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        // Extract user details
        const { userName, fullName, email, password } = req.body;

        // Check if user already exist
        const isUserAlreadyExist = await userModel.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(409).json({ message: 'User already exist' })
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
        console.log("Created user in registerUser Controller:", user)

        //generating a token using user's id: 
        const token = await user.generateAuthToken();
        console.log("Token:", token)
        res.status(200).json({ message: 'User registered successfully', token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

// this controller function will login the user using email and password:
module.exports.loginUser = async (req, res) => {
    //check errors in the data using express-validator:
    const errors = validationResult(req);

    //if there are errors it will return the errors:
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //extracting email and password from the request body:
        const { email, password } = req.body;
        console.log(email, password);
        //login user using userService:
        const { user, token } = await userService.loginUser(email, password);
        //set the token as a cookie
        res.cookie('token', token);

        //remove the password from the response
        user.password = undefined;

        //return the response
        res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(400).json({ error: error.message });
    }
}

//this controller function will get the user profile using user's id:
module.exports.getUserProfile = async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
}
