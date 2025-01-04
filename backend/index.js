import express from "express";
import config from "./config/config.js";
import dbConnect from "./config/dbConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import appError from "./utils/appError.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
const app = express();
const port = config.PORT;

const corsOptions = {
  origin: config.CORS_ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true,
};

dbConnect();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tickets", ticketRoutes);

app.all("*", (req, res, next) => {
  next(new appError(`Cant find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
