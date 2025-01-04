import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    passengers: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: {
          type: String,
          enum: ["male", "female", "other"],
          required: true,
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
