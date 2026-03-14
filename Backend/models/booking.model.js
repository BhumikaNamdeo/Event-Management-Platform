const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  type: String,
  price: Number,
  quantity: Number,
  subtotal: Number,
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
 

  tickets: [ticketSchema],
  totalAmount: Number,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  paymentStatus: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
