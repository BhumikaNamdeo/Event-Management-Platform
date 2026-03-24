const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PDFDocument = require("pdfkit");
const Booking = require("../models/booking.model");
const Event = require("../models/user.createEvent.model");
const User = require("../models/user.model");
const { getTicketHTML } = require("../utils/ticketTemplate");
const QRCode = require("qrcode");

exports.createCheckoutSession = async (req, res) => {
  const {
    tickets,
    customerEmail,
    userId,
    eventId,
    totalAmount,
    firstName,
    lastName,
    phone,
    email,
  } = req.body;

  if (!firstName || !lastName || !phone || !email) {
    return res.status(400).json({ error: "All customer details are required" });
  }

  if (!tickets || !Array.isArray(tickets)) {
    return res
      .status(400)
      .json({ error: "Tickets data is missing or not an array" });
  }

  try {
    // Step 1: Booking document create karo
    const newBooking = new Booking({
      userId,
      eventId,
      tickets,
      totalAmount,
      firstName,
      lastName,
      phone,
      email,
      paymentStatus: "Pending",
      createdAt: new Date(),
    });

    await newBooking.save();

    // Step 2: Stripe checkout session create karo
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: tickets.map((ticket) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: ticket.type || "Event Ticket",
          },
          unit_amount: ticket.price * 100,
        },
        quantity: ticket.quantity,
      })),

      customer_email: customerEmail,
      success_url: `${process.env.FRONTEND_URL}/success?bookingId=${newBooking._id}`, // bookingId URL me bhejo
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    // Step 3: BookingId aur sessionId dono frontend ko bhejo
    res.status(200).json({ sessionId: session.id, bookingId: newBooking._id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.generateTicket = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId).populate("eventId");

        if (!booking) return res.status(404).json({ error: "Booking not found" });

        const event = booking.eventId;
        const qrCodeDataURL = await QRCode.toDataURL(`${bookingId}`);

        const doc = new PDFDocument({ size: "A4", margin: 50 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=ticket-${bookingId}.pdf`);

        doc.pipe(res);

        // Header
        doc.fontSize(26).fillColor("#1a5f7a").text("EVENT TICKET", { align: "center" });
        doc.moveDown();
        doc.strokeColor("#cccccc").moveTo(50, 100).lineTo(545, 100).stroke();

        // Details
        doc.moveDown().fillColor("#000000").fontSize(14).text(`Customer: ${booking.firstName} ${booking.lastName}`);
        doc.text(`Phone: ${booking.phone} | Email: ${booking.email}`);
        doc.moveDown();

        doc.fontSize(16).fillColor("#1a5f7a").text("EVENT DETAILS");
        doc.fontSize(14).fillColor("#000000").text(`Event: ${event.title}`);
        doc.text(`Location: ${event.venue}`);
        doc.text(`Date: ${new Date(event.date).toLocaleDateString("en-IN")} | Time: ${event.time}`);
        doc.moveDown();

        doc.text("TICKETS:");
        booking.tickets.forEach((t) => {
            const subtotal = t.subtotal || (t.price * t.quantity);
            doc.fontSize(12).text(`- ${t.type}: ${t.quantity} x Rs. ${t.price} = Rs. ${subtotal}`);
        });

        doc.moveDown().fontSize(18).text(`Total Paid: Rs. ${booking.totalAmount}`, { bold: true });

        // QR Code
        const qrImageBuffer = Buffer.from(qrCodeDataURL.split(",")[1], "base64");
        doc.image(qrImageBuffer, 400, 500, { width: 120 });
        
        doc.fontSize(10).fillColor("gray").text("Please show this QR at the venue.", 50, 700);

        doc.end();
    } catch (error) {
        console.error("Ticket error:", error);
        res.status(500).json({ error: "Could not generate ticket" });
    }
};

exports.updatePaymentStatus = async (req, res) => {
  const { bookingId } = req.body;
  if (!bookingId) {
    return res.status(400).json({ error: "Booking ID missing" });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: "Paid" },
      { new: true } // updated document return kare
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Payment status updated",
      booking: updatedBooking,
    });
  } catch (err) {
    console.error("Error updating payment status:", err);
    res.status(500).json({ error: err.message });
  }
};
