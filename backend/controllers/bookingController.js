import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import Flight from "../models/flightModel.js";
import Booking from "../models/bookingModel.js";
import Ticket from "../models/ticketModel.js";
export const handleCreateBooking = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const { flightId, passengers } = req.body;

  if (!user || !flightId || !passengers || passengers.length === 0) {
    return next(
      new appError("User, flight, and passengers details are required.", 400)
    );
  }

  const flight = await Flight.findById(flightId);
  if (!flight) {
    return next(new appError("Flight not found", 404));
  }

  if (flight.availableSeats < passengers.length) {
    return next(
      new appError("Not enough available seats on this flight.", 400)
    );
  }

  const booking = await Booking.create({
    user,
    flight: flightId,
    passengers,
  });

  flight.availableSeats -= passengers.length;
  await flight.save();

  res.status(201).json({
    status: "success",
    data: {
      booking,
      message: "Booking Succesful",
    },
  });
});

export const handleGetBookingsByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new appError("User ID is required.", 400));
  }

  const bookings = await Booking.find({ user: userId })
    .populate("flight ticket")
    .sort({ createdAt: -1 });

  if (bookings.length === 0) {
    return next(new appError("No bookings found for this user.", 404));
  }

  res.status(200).json({
    status: "success",
    data: bookings,
  });
});

export const handleUpdateBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { passengers, paymentStatus } = req.body;

  if (!passengers && !paymentStatus) {
    return next(
      new appError(
        "At least one of passengers or paymentStatus should be provided.",
        400
      )
    );
  }

  const booking = await Booking.findById(id).populate("flight");
  if (!booking) {
    return next(new appError("Booking not found.", 404));
  }

  // Check if the paymentStatus is already 'completed'
  if (booking.paymentStatus === "completed") {
    return next(
      new appError("Cannot modify booking. Payment is already completed.", 400)
    );
  }

  if (passengers) {
    booking.passengers = passengers;
  }

  if (paymentStatus) {
    booking.paymentStatus = paymentStatus;

    if (paymentStatus === "completed") {
      const ticket = new Ticket({
        booking: booking._id,
        totalPayment: booking.flight.price * booking.passengers.length,
        ticketNumber: `TKT-${Date.now()}`,
      });
      const ticketResult = await ticket.save();
      console.log(ticketResult);
      booking.ticket = ticket._id;
    }
  }

  await booking.save();

  res.status(200).json({
    status: "success",
    data: {
      booking,
      message: "Booking updated succesfully",
    },
  });
});

export const handleGetBookingByBookingId = catchAsync(
  async (req, res, next) => {
    const { bookingId } = req.params;

    if (!bookingId) return next(new appError("Invalid Booking Id", 404));

    const booking = await Booking.findById(bookingId).populate("flight");

    if (!booking) return next(new appError("Invalid Booking Id", 404));

    res.status(200).json({
      status: "success",
      data: {
        booking,
        message: "Booking fetched succesfully",
      },
    });
  }
);
