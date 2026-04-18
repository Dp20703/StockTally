const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateRequest } = require('../middlewares/validateRequest');
const upload = require('../middlewares/multer');
const { validateRegister, validateLogin, validateGoogleAuth, validateUpdateProfile, } = require('../middlewares/user.validators');

// POST /users/register
router.post('/register',
    validateRegister,
    validateRequest,
    userController.registerUser
);

// POST /users/login
router.post('/login',
    validateLogin,
    validateRequest,
    userController.loginUser
);

// POST /users/auth/google
router.post('/auth/google',
    validateGoogleAuth,
    validateRequest,
    userController.googleAuthController
);

// GET /users/profile
router.get('/profile',
    authMiddleware.authUser,
    userController.getUserProfile
);

// PUT /users/update_profile
router.put('/update_profile',
    authMiddleware.authUser,
    upload.single('profilePic'),
    validateUpdateProfile,
    validateRequest,
    userController.updateProfile
);

// DELETE /users/delete_profile_pic
router.delete('/delete_profile_pic',
    authMiddleware.authUser,
    userController.deleteProfilePic
);

// POST /users/logout 
router.post('/logout',
    authMiddleware.authUser,
    userController.logoutUser
);

module.exports = router;
