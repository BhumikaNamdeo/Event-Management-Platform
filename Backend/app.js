require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const Stripe = require("stripe");
const session = require("express-session");
const connectDB = require("./config/db");
const userRoute = require("./routes/user.route");
const eventRoute = require("./routes/event.route");
const bookingRoute = require("./routes/booking.route");
const organizerRoutes = require("./routes/organizer.routes");
const paymentRoutes = require("./routes/payment.route");
const cookieParser = require("cookie-parser");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,}));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,}));
app.use("/user", userRoute);
app.use("/event", eventRoute);
app.use("/booking", bookingRoute);
app.use("/organizer", organizerRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
