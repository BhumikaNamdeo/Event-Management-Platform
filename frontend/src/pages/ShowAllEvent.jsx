import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import axios from "axios";
import SideNavBar from "../components/SideNavBar";

const ShowAllEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/event/allEvent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched events:", res.data); // Debug
      setEvents(res.data); // ✅ Missing in your code
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div>
      <div className=" p-4 min-h-screen  bg-gray-50">
        <h1 className="text-4xl  font-bold text-[#0b3948] ">
          All Events ({events.length})
        </h1>

        {events.length === 0 ? (
          <p className="text-gray-900">No events available yet.</p>
        ) : (
          <div className="">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default ShowAllEvent;
