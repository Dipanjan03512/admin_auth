const express = require("express");
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// List movies with total bookings
router.get("/movies-bookings", authMiddleware, adminMiddleware, reportController.getMoviesWithBookings);

// List bookings by theater
router.get("/theater-bookings", authMiddleware, adminMiddleware, reportController.getBookingsByTheater);

// Send booking summary to user email
router.post("/send-summary", authMiddleware, adminMiddleware, reportController.sendBookingSummary);

module.exports = router;
