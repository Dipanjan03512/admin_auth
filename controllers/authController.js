const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to validate input fields
const validateInput = (fields) => {
  return fields.every((field) => field && field.trim() !== "");
};

const register = async (req, res) => {
  try {
    const { userID, email, password, role } = req.body;

    // Validate input
    if (!validateInput([userID, email, password])) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ userID }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with the same userID or email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role (defaults to 'user')
    const userRole = ["admin", "user"].includes(role) ? role : "user";

    // Create the user
    const newUser = await User.create({
      userID,
      email,
      password: hashedPassword,
      role: userRole,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        userID: newUser.userID,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { userID, password } = req.body;

    // Validate input
    if (!validateInput([userID, password])) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};

module.exports = { register, login };
