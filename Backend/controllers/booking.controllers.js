const Booking = require("../models/booking.model");
const Event = require("../models/user.createEvent.model");
const User = require("../models/user.model"); 

exports.bookingEvent = async (req, res) => {
  try {
    const { eventId, selectedTickets } = req.body;
    const userId = req.user.id;

    if (!eventId || !selectedTickets || selectedTickets.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ✅ Find user to get name
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate totalAmount and subtotal for each ticket type
    let totalAmount = 0;
    const ticketDetails = selectedTickets.map(ticket => {
      const subtotal = ticket.price * ticket.quantity;
      totalAmount += subtotal;

      return {
        ...ticket,
        subtotal
      };
    });

    // Create Booking
    const booking = new Booking({
      userId,
      eventId,
      tickets: ticketDetails,
      totalAmount,
      paymentStatus: "Pending"
    });

    await booking.save();

    return res.status(200).json({
      message: "Booking initiated. Proceed to payment.",
      booking,
      bookingId: booking._id,
      userName: user.name, // ✅ User name here
      payment: {
        amount: totalAmount,
        currency: "INR"
      }
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error while booking ticket" });
  }
};


exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")       // Only fetch name and email from user
      .populate("eventId", "title date");     // Only fetch title and date from event

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Fetch Bookings Error:", error);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
};










exports.getEventSalesStats = async (req, res) => {
  try {
    const events = await Event.find(); // 🔁 Dynamically get all events

    const eventStats = await Promise.all(
      events.map(async (event) => {
        const bookings = await Booking.find({ eventId: event._id });

        let totalTicketsSold = 0;
        let totalRevenue = 0;
        let ticketBreakdown = {};

        bookings.forEach((booking) => {
          booking.tickets.forEach((ticket) => {
            const ticketType = ticket.name || "Unknown Ticket";
            if (!ticketBreakdown[ticketType]) {
              ticketBreakdown[ticketType] = {
                totalSold: 0,
                totalRevenue: 0,
                price: ticket.price
              };
            }

            ticketBreakdown[ticketType].totalSold += ticket.quantity;
            ticketBreakdown[ticketType].totalRevenue += ticket.quantity * ticket.price;
            totalTicketsSold += ticket.quantity;
            totalRevenue += ticket.quantity * ticket.price;
          });
        });

        return {
          event: {
            id: event._id,
            title: event.title,
            date: event.date,
            image: event.image
          },
          totalTicketsSold,
          totalRevenue,
          ticketBreakdown
        };
      })
    );

    res.json(eventStats); // ✅ Response with dynamic events
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


