import Ticket from "../models/ticketModel.js";
import appError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
export const handleGetTicketDetails = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    return next(new appError("Booking ID is required.", 400));
  }

  // Find ticket associated with the booking
  const ticket = await Ticket.findOne({ booking: bookingId });

  if (!ticket) {
    return next(new appError("Ticket not found for this booking.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
});
