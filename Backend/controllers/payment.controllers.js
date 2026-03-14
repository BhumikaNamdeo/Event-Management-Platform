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

exports.downloadTicketPDF = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Booking fetch directly from DB
    const booking = await Booking.findById(bookingId).populate("eventId");
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const event = booking.eventId;

    // QR Code generate
    const qrCodeDataURL = await QRCode.toDataURL(`${bookingId}`);

    const ticketData = {
      firstName: booking.firstName,
      lastName: booking.lastName,
      phone: booking.phone,
      email: booking.email,
      eventTitle: event.title,
      eventCategory: event.category,
      eventDate: new Date(event.date).toLocaleDateString("en-IN"),
      eventTime: event.time,
      location: event.venue,
      tickets: booking.tickets.map((t) => ({
        type: t.type,
        quantity: t.quantity,
        price: t.price,
        subtotal: t.subtotal,
      })),
      totalAmount: booking.totalAmount,
      paymentStatus: booking.paymentStatus,
      bookedAt: booking.createdAt,
    };

    // Puppeteer HTML template
    const html = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: green;">Event Ticket</h1>
          <hr/>
          <h2>Customer Details</h2>
          <p><b>Name:</b> ${ticketData.firstName} ${ticketData.lastName}</p>
          <p><b>Phone:</b> ${ticketData.phone}</p>
          <p><b>Email:</b> ${ticketData.email}</p>

          <h2>Event Details</h2>
          <p><b>Event:</b> ${ticketData.eventTitle}</p>
          <p><b>Category:</b> ${ticketData.eventCategory}</p>
          <p><b>Date:</b> ${ticketData.eventDate}</p>
          <p><b>Time:</b> ${ticketData.eventTime}</p>
          <p><b>Location:</b> ${ticketData.location}</p>

          <h2>Tickets</h2>
          <ul>
            ${ticketData.tickets
              .map(
                (t) =>
                  `<li>${t.type} - ${t.quantity} x ₹${t.price} = ₹${t.subtotal}</li>`
              )
              .join("")}
          </ul>

          <h2>Total Amount: ₹${ticketData.totalAmount}</h2>
          <p><b>Payment Status:</b> ${ticketData.paymentStatus}</p>
          <p><b>Booked At:</b> ${new Date(
            ticketData.bookedAt
          ).toLocaleString()}</p>

          <h2>QR Code</h2>
          <img src="${qrCodeDataURL}" alt="QR Code" width="150" height="150"/>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="ticket-${bookingId}.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.generateTicket = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({ error: "Booking ID is required" });
    }

    const booking = await Booking.findById(bookingId).populate("eventId");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const event = booking.eventId;

    const qrCodeDataURL = await QRCode.toDataURL(`${bookingId}`);

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket-${bookingId}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(24).text("🎫 Event Ticket", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(`Name: ${booking.firstName} ${booking.lastName}`);
    doc.text(`Phone: ${booking.phone}`);
    doc.text(`Email: ${booking.email}`);
    doc.moveDown();

    doc.text(`Event Title: ${event.title}`);
    doc.text(`Category: ${event.category}`);
    doc.text(`Date: ${new Date(event.date).toLocaleDateString("en-IN")}`);
    doc.text(`Time: ${event.time}`);
    doc.text(`Location: ${event.venue}`);
    doc.moveDown();

    doc.text("Tickets Booked:");
    booking.tickets.forEach((ticket, idx) => {
      doc.text(
        `  ${idx + 1}. ${ticket.type} - Quantity: ${
          ticket.quantity
        } - Price per ticket: ₹${ticket.price} - Subtotal: ₹${ticket.subtotal}`
      );
    });
    doc.moveDown();

    doc.text(`Total Amount Paid: ₹${booking.totalAmount}`);
    doc.text(`Payment Status: ${booking.paymentStatus}`);
    doc.text(
      `Booking Date: ${new Date(booking.createdAt).toLocaleDateString("en-IN")}`
    );
    doc.moveDown();

    // QR code embed
    const qrImageBuffer = Buffer.from(qrCodeDataURL.split(",")[1], "base64");
    doc.image(qrImageBuffer, { fit: [150, 150], align: "center" });
    doc.moveDown();

    doc.text("Thank you for your booking!", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Ticket generation error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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
