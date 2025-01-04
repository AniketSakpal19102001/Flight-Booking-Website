import express from "express";
import {
  handleCreateBooking,
  handleGetBookingByBookingId,
  handleGetBookingsByUser,
  handleUpdateBooking,
} from "../controllers/bookingController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();
router.post("/", verifyToken, handleCreateBooking);
router.get("/:userId", verifyToken, handleGetBookingsByUser);
router.put("/:id", verifyToken, handleUpdateBooking);
router.get("/single/:bookingId", verifyToken, handleGetBookingByBookingId);
export default router;
