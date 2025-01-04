import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  totalPayment: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  ticketNumber: { type: String, required: true, unique: true },
});

export default mongoose.model("Ticket", TicketSchema);
