require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);
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
console.log("CORS Origin:", process.env.FRONTEND_URL);
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,}));
// app.use(
//   cors({
//     origin: [
//       "https://your-frontend-name.vercel.app", // Yahan apna Vercel wala link daaliye
//       "http://localhost:5173"                // Taaki local pe bhi chalta rahe
//     ],
//     credentials: true
//   })
// );
app.use(
  cors({
    origin: [
      "https://event-management-platform-peach.vercel.app", // Aapka actual Vercel link
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false,}));
app.set("trust proxy", 1); // Render backend ke liye zaroori hai
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // HTTPS ke liye (Live site pe zaroori hai)
      sameSite: "none", // Cross-domain (Vercel to Render) ke liye zaroori hai
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);
app.use("/user", userRoute);
app.use("/event", eventRoute);
app.use("/booking", bookingRoute);
app.use("/organizer", organizerRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
