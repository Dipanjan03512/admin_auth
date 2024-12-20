const express = require("express");
const theaterController = require("../controllers/theaterController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Add a new theater
router.post("/add", authMiddleware, adminMiddleware, theaterController.addTheater);

// Assign a movie to a theater
router.post("/assign-movie", authMiddleware, adminMiddleware, theaterController.assignMovieToTheater);

// Get list of theaters for a movie
router.get("/movie/:movieId", theaterController.getTheatersForMovie);

module.exports = router;
