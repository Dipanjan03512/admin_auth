const express = require("express");
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Book tickets for a movie
router.post("/book", authMiddleware, bookingController.bookTickets);

// Cancel a booking
router.delete("/cancel/:bookingId", authMiddleware, bookingController.cancelBooking);

// View booking history
router.get("/history", authMiddleware, bookingController.getBookingHistory);

module.exports = router;
