const User = require("../models/User");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const uploadImage = require("../helper/userImage"); // Assuming user image upload helper

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userInfo.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user details",
      error: error.message,
    });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userID, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check for password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Update other details
    if (userID) user.userID = userID;
    if (email) user.email = email;

    // Handle profile picture upload if provided
    if (req.file) {
      user.profilePicture = req.file.path; // Assuming the path is saved in the model
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user details",
      error: error.message,
    });
  }
};

module.exports = { getUserDetails, updateUserDetails };
