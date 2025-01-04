import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  travelDate: { type: Date, required: true },
  arrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true },
});
export default mongoose.model("Flight", FlightSchema);
