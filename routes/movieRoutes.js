const express = require("express");
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Add a new movie
router.post("/add", authMiddleware, adminMiddleware, movieController.addMovie);

// Edit movie details
router.put("/:movieId", authMiddleware, adminMiddleware, movieController.updateMovie);

// Delete movie details
router.delete("/:movieId", authMiddleware, adminMiddleware, movieController.deleteMovie);

// List all movies
router.get("/", movieController.getMovies);

module.exports = router;
