import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import config from "../config/config.js";
import Flight from "../models/flightModel.js";
import { generateFlightNumber } from "../utils/generateFlightNumber.js";

export const handleAddFlight = catchAsync(async (req, res, next) => {
  const {
    source,
    destination,
    price,
    availableSeats,
    travelDate,
    arrivalTime,
    departureTime,
  } = req.body;

  if (
    !source ||
    !destination ||
    !price ||
    !availableSeats ||
    !travelDate ||
    !arrivalTime ||
    !departureTime
  ) {
    return next(
      new appError(
        "Missing required fields. Please provide all necessary details.",
        400
      )
    );
  }

  const flightNumber = generateFlightNumber();

  const existingFlight = await Flight.findOne({ flightNumber });
  if (existingFlight) {
    return next(
      new appError(
        "Flight with this flight number already exists. Try again later.",
        409
      )
    );
  }

  const newFlight = new Flight({
    flightNumber,
    source,
    destination,
    price,
    availableSeats,
    travelDate,
    arrivalTime,
    departureTime,
  });

  await newFlight.save();

  res.status(201).json({
    status: "success",
    message: "Flight created successfully",
    flight: newFlight,
  });
});

export const handleGetFlightByDetails = catchAsync(async (req, res, next) => {
  const { source, destination, travelDate } = req.query;

  if (!source || !destination || !travelDate) {
    return next(
      new appError("Source, destination, and travel date are required.", 400)
    );
  }
  const date = new Date(travelDate);

  const flights = await Flight.find({
    source,
    destination,
    travelDate: date,
  });

  if (flights.length === 0) {
    return next(new appError("No flights found for the given details.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      flights,
    },
  });
});

export const handleGetFlightById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const flight = await Flight.findById(id);

  if (!flight) {
    return next(new appError("No flight found with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      flight,
    },
  });
});

export const getAllFlight = catchAsync(async (req, res, next) => {
  const flights = await Flight.find();
  res.status(200).json({
    status: "success",
    data: flights,
  });
});
