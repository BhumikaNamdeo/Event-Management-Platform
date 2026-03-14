const Event = require("../models/user.createEvent.model");
const Booking = require("../models/booking.model");
const mongoose = require("mongoose");
const createEvent = async (req, res) => {
  console.log("REQ.USER:", req.user);
  console.log(req.body);

  try {
    const { title, description, date, time, category, venue } = req.body;

    let tickets = [];
    try {
      tickets = JSON.parse(req.body.tickets).filter(
        (t) => t && t.type && t.price
      );
    } catch (e) {
      return res.status(400).json({ message: "Invalid ticket data format" });
    }

    const image = req.file ? req.file.filename : null;

    if (!venue || !image) {
      return res
        .status(400)
        .json({ message: "Location and Image are required" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      category,
      venue,
      image,
      tickets,
      createdBy: req.user.id,
      organizerId: req.user.id, // ✅ fix here
    });

    await newEvent.save();
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Event creation failed:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

const getEventById = async (req, res) => {
  console.log("Received ID:", req.params.id); // ✅ log what ID is received

  try {
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("Invalid ID format");
      return res.status(400).json({ message: "Invalid event id" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      console.log("Event not found for ID:", req.params.id);
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("Event fetched successfully:", event);
    res.json(event);
  } catch (error) {
    console.error("Error in getEventById:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Event updated", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
