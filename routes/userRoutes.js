const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", authMiddleware, userController.getProfile);

// Edit user profile (with profile picture upload)
router.put("/profile", authMiddleware, userController.updateProfile);

module.exports = router;
