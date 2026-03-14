const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

   
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
    },
     sold: {
    type: Number,
    default: 0
  }
  },
 { _id: false });

const eventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Event description is required"]
  },
  date: {
    type: Date,
    required: [true, "Event date is required"]
  },
  time: {
    type: String,
    required: [true, "Event time is required"]
  },
  venue: {
    type: String,
    required: [true, "Event location is required"]
  },
  category: {
    type: String,
    enum: ["Music", "Tech", "Workshop", "Sports", "Business", "Other"],
    default: "Other"
  },
 image: {
  type: String,
  required: true
},

organizerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},


  tickets: [ticketSchema], 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Event", eventSchema);
