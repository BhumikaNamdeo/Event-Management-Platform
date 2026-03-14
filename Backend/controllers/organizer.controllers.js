const Event = require("../models/user.createEvent.model");
const Booking = require("../models/booking.model");

exports.getOrganizerDashboard = async (req, res) => {
  try {
    const organizerId = req.user.id;

    // 🟢 All Events Created by This Organizer
    const allEvents = await Event.find({ organizerId });

    const totalEvents = allEvents.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time for accurate comparison

    // 🟡 Upcoming Events (today or later)
    const upcomingEvents = allEvents.filter(event => new Date(event.date) >= today);

    // 🔴 Completed Events (before today)
    const completedEvents = allEvents.filter(event => new Date(event.date) < today);

    // 🧾 All Bookings for These Events
    const eventIds = allEvents.map((e) => e._id);
    const bookings = await Booking.find({ eventId: { $in: eventIds } });

    // 🧮 Calculate Revenue & Tickets
    let totalTicketsSold = 0;
    let totalRevenue = 0;

    bookings.forEach((booking) => {
      booking.tickets.forEach((ticket) => {
        totalTicketsSold += ticket.quantity;
        totalRevenue += ticket.price * ticket.quantity;
      });
    });

    // 📊 Graph for frontend
    const eventGraph = [
      { name: "Total Events", count: totalEvents },
      { name: "Upcoming Events", count: upcomingEvents.length },
      { name: "Completed Events", count: completedEvents.length },
    ];

    // 🟩 Static Financial Chart (can make dynamic later)
    const weeklyChart = [
      { day: "Mon", revenue: 7000, income: 7000, daily: 3000 },
      { day: "Tue", revenue: 6000, income: 6000, daily: 3500 },
      { day: "Wed", revenue: 8000, income: 8000, daily: 4000 },
      { day: "Thu", revenue: 9000, income: 9000, daily: 2500 },
      { day: "Fri", revenue: 5000, income: 5000, daily: 5000 },
      { day: "Sat", revenue: 6000, income: 6000, daily: 5500 },
      { day: "Sun", revenue: 1000, income: 1000, daily: 4200 },
    ];

    res.status(200).json({
      totalEvents,
      upcomingEvents: upcomingEvents.length,
      completedEvents: completedEvents.length,
      totalTicketsSold,
      totalRevenue,
      eventGraph,
      weeklyChart,
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
