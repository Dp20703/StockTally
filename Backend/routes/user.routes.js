const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateRequest } = require("../middlewares/validateRequest");
const multer = require("multer");
const upload = require("../config/multer");
const {
  validateRegister,
  validateLogin,
  validateGoogleAuth,
  validateUpdateProfile,
} = require("../validators/user.validators");

// POST /users/register
router.post(
  "/register",
  validateRegister,
  validateRequest,
  userController.registerUser,
);

// POST /users/login
router.post("/login", validateLogin, validateRequest, userController.loginUser);

// POST /users/auth/google
router.post(
  "/auth/google",
  validateGoogleAuth,
  validateRequest,
  userController.googleAuthController,
);

// GET /users/profile
router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

// PUT /users/update_profile
router.put(
  "/update_profile",
  authMiddleware.authUser,
  (req, res, next) => {
    upload.single("profilePic")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ error: "File too large. Max 5MB allowed." });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  validateUpdateProfile,
  validateRequest,
  userController.updateProfile,
);

// DELETE /users/delete_profile_pic
router.delete(
  "/delete_profile_pic",
  authMiddleware.authUser,
  userController.deleteProfilePic,
);

// POST /users/logout
router.post("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
