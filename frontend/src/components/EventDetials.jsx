import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "./Footer";
import { API_BASE } from "../config";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const EventDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const paymentSuccess = location.state?.paymentSuccess || false;

  const [event, setEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${API_BASE}/event/viewDetail/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvent(res.data);
      } catch (error) {
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event)
    return <p className="p-6 text-red-500">Loading event details...</p>;

  const handleBooking = async () => {
    if (!selectedTicket) {
      toast.error("Please select a ticket");
      return;
    }
    if (!firstName || !lastName || !phone || !email) {
      toast.error("Please fill out all user information fields");
      return;
    }

    const token = localStorage.getItem("token");
    const ticketDetails = event.tickets.find((t) => t.type === selectedTicket);
    const totalAmount = ticketDetails.price * quantity;

    try {
      const stripe = await stripePromise;
      const res = await axios.post(
        `${API_BASE}/payment/create-checkout-session`,
        {
          eventId: id,
          tickets: [
            { type: ticketDetails.type, price: ticketDetails.price, quantity },
          ],
          totalAmount,
          firstName,
          lastName,
          phone,
          email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { sessionId, bookingId } = res.data;
      localStorage.setItem("bookingId", bookingId);
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ToastContainer autoClose={1500} />

      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-8xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Event Info */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h1 className="text-4xl font-bold text-[#264653] mb-2">
              {event.title}
            </h1>
            <p className="text-gray-600 text-md mb-4">{event.description}</p>

            <div className="flex flex-wrap gap-4 text-gray-700 text-sm">
              <span className="flex text-xl font-semibold items-center gap-2">
                📅{" "}
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex text-xl font-semibold items-center gap-2">
                ⏰ {event.time}
              </span>
              <span className="flex text-xl font-semibold items-center gap-2">
                📍 {event.venue}
              </span>
            </div>

            {/* Ticket Options */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">🎟️ Choose Ticket</h3>
              <div className="space-y-3">
                {event.tickets?.map((ticket, idx) => (
                  <label
                    key={idx}
                    className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition ${
                      selectedTicket === ticket.type
                        ? "border-blue-500 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ticketType"
                        value={ticket.type}
                        checked={selectedTicket === ticket.type}
                        onChange={() => setSelectedTicket(ticket.type)}
                      />
                      <span className="font-medium">{ticket.type}</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      ₹{ticket.price}
                    </span>
                  </label>
                ))}
              </div>

              {selectedTicket && (
                <div className="mt-5 flex items-center gap-4">
                  <label className="font-medium">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20 text-center border rounded p-2"
                  />
                </div>
              )}

              {selectedTicket && (
                <p className="mt-5 text-lg font-bold">
                  Total:{" "}
                  <span className="text-red-600">
                    ₹
                    {
                      event.tickets.find((t) => t.type === selectedTicket)
                        ?.price * quantity
                    }
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-2xl font-bold text-[#264653] mb-6">
              👤 Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
              {/* First Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="mb-1 text-xl font-medium text-gray-700"
                >
                  First Name*
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="mb-1 text-xl font-medium text-gray-700"
                >
                  Last Name*
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="mb-1 text-xl font-medium text-gray-700"
                >
                  Phone Number*
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1 text-xl font-medium text-gray-700"
                >
                  Email Address*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              className="mt-8 w-full bg-[#264653] text-white py-3 rounded-lg font-semibold hover:bg-[#1e3a4a] transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

   <div className="mt-40">
       <Footer />
   </div>
    </div>
  );
};

export default EventDetails;
