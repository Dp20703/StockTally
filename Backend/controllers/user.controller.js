const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');

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
        console.log("Token", token)
        res.status(200).json({ message: 'User registered successfully', token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}