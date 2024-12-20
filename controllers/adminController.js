const User = require("../models/User");
const Movie = require("../models/Movie");
const Booking = require("../models/Booking");
const Theater = require("../models/Theater");

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

// Get all movies (Admin only)
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve movies",
      error: error.message,
    });
  }
};

// Delete a user (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// Delete a movie (Admin only)
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete movie",
      error: error.message,
    });
  }
};

// View all bookings (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("movieID", "name")
      .populate("userID", "userID")
      .populate("theaterID", "name");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
};

// Add a theater (Admin only)
const addTheater = async (req, res) => {
  try {
    const { name, location, capacity, movies } = req.body;

    if (!name || !location || !capacity) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const theater = await Theater.create({
      name,
      location,
      capacity,
      movies,
    });

    res.status(201).json({
      success: true,
      message: "Theater added successfully",
      theater,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add theater",
      error: error.message,
    });
  }
};

// Update a theater (Admin only)
const updateTheater = async (req, res) => {
  try {
    const { name, location, capacity, movies } = req.body;
    const theater = await Theater.findById(req.params.id);

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: "Theater not found",
      });
    }

    theater.name = name || theater.name;
    theater.location = location || theater.location;
    theater.capacity = capacity || theater.capacity;
    theater.movies = movies || theater.movies;

    await theater.save();

    res.status(200).json({
      success: true,
      message: "Theater updated successfully",
      theater,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update theater",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAllMovies,
  deleteUser,
  deleteMovie,
  getAllBookings,
  addTheater,
  updateTheater,
};
