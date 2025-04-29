const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require("../Controllers/user.controller");
const authmiddleware = require("../middlewares/auth.middleware");

router.get("/", function (req, res) {
    res.send("Hello from user route /");
})
// users/register
router.post('/register', [
    body('userName')
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters.'),
    body('fullName.firstName')
        .notEmpty().withMessage('First name is required.')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long.'),
    body('fullName.lastName')
        .optional()
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long.'),
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
], usercontroller.registerUser)

// users/login
router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], usercontroller.loginUser)

// users/profile
router.get('/profile', authmiddleware.authUser, usercontroller.getUserProfile);

module.exports = router;