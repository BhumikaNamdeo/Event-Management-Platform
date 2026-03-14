const puppeteer = require("puppeteer");
const { getTicketHTML } = require("./ticketTemplate");

const QRCode = require('qrcode');

const Booking = require("../models/Booking");
const puppeteer = require("puppeteer");

// Ticket HTML generator
function getTicketHTML(data, qrCodeDataURL) {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: green;">🎟 Event Ticket</h1>
        <hr/>
        <h2>Customer Details</h2>
        <p><b>Name:</b> ${data.firstName} ${data.lastName}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Email:</b> ${data.email}</p>

        <h2>Event Details</h2>
        <p><b>Event:</b> ${data.eventTitle}</p>
        <p><b>Category:</b> ${data.eventCategory}</p>
        <p><b>Date:</b> ${data.eventDate}</p>
        <p><b>Time:</b> ${data.eventTime}</p>
        <p><b>Location:</b> ${data.location}</p>

        <h2>Tickets</h2>
        <ul>
          ${data.tickets.map(t => `<li>${t.type} - ${t.quantity} x ₹${t.price} = ₹${t.subtotal}</li>`).join('')}
        </ul>

        <h2>Total Amount: ₹${data.totalAmount}</h2>
        <p><b>Payment Status:</b> ${data.paymentStatus}</p>
        <p><b>Booked At:</b> ${new Date(data.bookedAt).toLocaleString()}</p>

        <h2>QR Code</h2>
        <img src="${qrCodeDataURL}" alt="QR Code" width="150" height="150"/>
      </body>
    </html>
  `;
}

// Download ticket PDF
exports.downloadTicketPDF = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId).populate("eventId"); // userId populate mat karo

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const event = booking.eventId;

    const ticketData = {
      firstName: booking.firstName,
      lastName: booking.lastName,
      phone: booking.phone,
      email: booking.email,
      eventTitle: event.title,
      eventCategory: event.category,
      eventDate: event.date,
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

    // QR code generate karne ke liye
    const qrCodeDataURL = await generateQRCode(`${bookingId}`); // apna QR function
    const html = getTicketHTML(ticketData, qrCodeDataURL);

    const browser = await puppeteer.launch();
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


