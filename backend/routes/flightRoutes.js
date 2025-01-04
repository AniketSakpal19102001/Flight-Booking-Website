import express from "express";
import {
  getAllFlight,
  handleAddFlight,
  handleGetFlightByDetails,
  handleGetFlightById,
} from "../controllers/flightController.js";
import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();
router.post("/add", verifyToken, isAdmin, handleAddFlight);
router.get("/", verifyToken, handleGetFlightByDetails);
router.get("/all", verifyToken, getAllFlight);
router.get("/:id", verifyToken, handleGetFlightById);
export default router;
