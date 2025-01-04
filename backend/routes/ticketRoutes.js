import express from "express";
import { handleGetTicketDetails } from "../controllers/ticketController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();
router.get("/:bookingId", verifyToken, handleGetTicketDetails);
export default router;
