const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { userID, email, password, role } = req.body;

    // Validate input
    if (!userID || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ userID }, { email }],
    });
    if (checkExistingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Assign role
    const userRole = role && ["admin", "user"].includes(role) ? role : "user";

    // Create the new user
    const newlyCreatedUser = await User.create({
      userID,
      email,
      password: hashedPassword,
      role: userRole,
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newlyCreatedUser,
    });
  } catch (error) {
    // Handle errors and return them in the response
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { userID, password } = req.body;

    // Validate input
    if (!userID || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        user: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15min",
      }
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login user",
      error: error.message,
    });
  }
};

module.exports = { register, login };
