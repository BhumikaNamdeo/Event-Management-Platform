import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Search, MapPin, Calendar, Clock, Heart, Share2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";


const Explore = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const eventsPerPage = 8;

  const handleDelete = async (eventId) => {
  const token = localStorage.getItem("token");
  if (window.confirm("Are you sure you want to delete this event?")) {
    try {
      await axios.delete(`${API_BASE}/event/create/event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e._id !== eventId));
      setFilteredEvents(filteredEvents.filter((e) => e._id !== eventId));
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting event.");
    }
  }
};

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/event/allEvent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(res.data);
        setFilteredEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length === 0) return;

    let updatedEvents = [...events];

    if (searchQuery) {
      updatedEvents = updatedEvents.filter(
        (event) =>
          event.title &&
          event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (location) {
      updatedEvents = updatedEvents.filter(
        (event) =>
          event.location &&
          event.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (category) {
      updatedEvents = updatedEvents.filter(
        (event) =>
          event.category &&
          event.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (startDate && endDate) {
      updatedEvents = updatedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
        );
      });
    }

    setFilteredEvents(updatedEvents);
    setCurrentPage(1);
  }, [searchQuery, category, location, startDate, endDate, events]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  if (loading) {
    return <div className="p-10 text-center">Loading events...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      

       <div className="bg-gray-100 mt-10 rounded-2xl z-10 mt-10 p-4 flex flex-col  md:flex-row gap-4 max-w-7xl mx-auto ">
  {/* Event Search */}
  <div className="flex-1 flex items-center px-3 py-2 rounded-xl bg-white">
    <Search className="w-5 h-5 text-pink-500 mr-2" />
    <input
      type="text"
      placeholder="Rock."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full rounded-md bg-transparent outline-none text-black placeholder-gray-800"
    />
  </div>

  {/* Location Search */}
  <div className="flex-1 flex items-center px-3 py-2 rounded-xl bg-white">
    <MapPin className="w-5 h-5 text-pink-500 mr-2" />
    <input
      type="text"
      placeholder="New York, NY"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full  rounded-md bg-transparent outline-none text-black placeholder-gray-800"
    />
  </div>

  {/* Search Button */}
  <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl text-sm md:text-base font-medium transition duration-200">
    Search
  </button>
</div>



      {/* Events Grid */}
      <div className="p-10  mt-5">
        <h1 className="text-4xl font-bold text-black mb-6">Explore Events</h1>

        <div className="grid grid-cols-1    sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => {
              const prices =
                event.tickets && event.tickets.length > 0
                  ? event.tickets.map((ticket) => ticket.price)
                  : [];
              const minPrice =
                prices.length > 0 ? Math.min(...prices) : null;

              return (
               <div
  key={event._id}
  className="
 relative group bg-white rounded-lg overflow-hidden shadow"
>
  <button 
      onClick={() => handleDelete(event._id)}
      className="absolute top-3 right-3 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 p-2 rounded-full transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 shadow-md border border-red-100"
    >
      <i className="ri-delete-bin-line text-xl cursor-pointer"></i>
    </button>
  <Link to={`/event/view`}>
    <img
      src={`${API_BASE}/uploads/${event.image}`}
      alt={event.title}
      className="w-full h-80 object-cover cursor-pointer"
    />
  </Link>

  <div className="p-4">
    <h3 className="text-2xl mb-2 capitalize font-bold text-gray-900">
      {event.title}
    </h3>

    <p className="text-gray-600 text-lg font-semibold">
      <i className="ri-calendar-2-line"></i>{" "}
      {new Date(event.date).toLocaleDateString("en-GB")}
    </p>

    <p className="text-gray-600 font-semibold text-lg mb-4 capitalize">
      <i className="ri-map-pin-line"></i> {event.venue}
    </p>

    <p className="text-red-400 ml-100 text-xl font-bold">
      {minPrice !== null
        ? `Price ₹${minPrice}`
        : "Price not available"}
    </p>
  </div>
</div>


              );
            })
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No events found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-white font-medium">Page {currentPage}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={indexOfLastEvent >= filteredEvents.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Explore;
