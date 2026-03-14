const Booking = require("../models/booking.model");
const Event = require("../models/user.createEvent.model");

exports.getEventSalesStats = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const bookings = await Booking.find({ eventId });

    let totalTicketsSold = 0;
    let totalRevenue = 0;
    const ticketSales = {};

    bookings.forEach(booking => {
      booking.tickets.forEach(ticket => {
        totalTicketsSold += ticket.quantity;
        totalRevenue += ticket.subtotal;

        // Group by ticket name
        if (!ticketSales[ticket.name]) {
          ticketSales[ticket.name] = {
            totalSold: 0,
            totalRevenue: 0,
            price: ticket.price
          };
        }

        ticketSales[ticket.name].totalSold += ticket.quantity;
        ticketSales[ticket.name].totalRevenue += ticket.subtotal;
      });
    });

    res.status(200).json({
      event: {
        title: event.title,
        date: event.date
      },
      totalTicketsSold,
      totalRevenue,
      ticketBreakdown: ticketSales
    });
  } catch (err) {
    console.error("Error getting event stats:", err);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
};
