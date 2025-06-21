const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateRequest } = require("../middlewares/validateRequest");
const upload = require('../middlewares/multer');

// users/register
router.post('/register', [
    body('userName')
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters.'),
    body('fullName.firstName')
        .notEmpty().withMessage('First name is required.')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long.'),
    // body('fullName.lastName')
    //     .optional()
    //     .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long.'),
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
], validateRequest, userController.registerUser)

// users/login
router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], validateRequest, userController.loginUser)

// users/profile
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

// /users/update_profile
router.put("/update_profile", authMiddleware.authUser, upload.single("profilePic"),
    userController.updateProfile
);

// /users/delete_profile_pic
router.delete('/delete_profile_pic', authMiddleware.authUser, userController.deleteProfilePic);

// /users/logout:
router.get('/logout', authMiddleware.authUser, userController.logoutUser)
module.exports = router;