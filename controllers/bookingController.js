const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const Theater = require("../models/Theater");

const listTheatersForMovie = async (req, res) => {
  try {
    const movieID = req.params.movieID;

    const movie = await Movie.findById(movieID);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const theaters = await Theater.find({ movies: movieID });

    res.status(200).json({
      success: true,
      theaters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch theaters",
      error: error.message,
    });
  }
};

const bookTickets = async (req, res) => {
  try {
    const { movieID, userID, theaterID, showTiming, numberOfTickets } = req.body;

    const movie = await Movie.findById(movieID);
    const theater = await Theater.findById(theaterID);

    if (!movie || !theater) {
      return res.status(404).json({
        success: false,
        message: "Movie or Theater not found",
      });
    }

    // Logic for booking tickets and updating available seats

    const booking = await Booking.create({
      userID,
      movieID,
      theaterID,
      showTiming,
      numberOfTickets,
    });

    res.status(201).json({
      success: true,
      message: "Tickets booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to book tickets",
      error: error.message,
    });
  }
};

module.exports = { listTheatersForMovie, bookTickets };
