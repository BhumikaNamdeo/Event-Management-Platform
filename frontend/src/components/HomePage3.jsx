import React from "react";
import { Calendar, MapPin } from "lucide-react";

// Local images (replace with your assets folder images)
import highlightImg from "../assets/img3.png";
import marathonImg from "../assets/img4.png";
import rockImg from "../assets/img5.png";
import harmonyImg from "../assets/img6.png";

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
      {/* Highlights */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold">
          Highlights <span className="text-pink-500">this week</span>
        </h2>
        <button className="text-pink-500 text-md font-medium hover:underline">
          View more
        </button>
      </div>

      <div className="relative w-[1240px] h-[418px] rounded-lg overflow-hidden">
        <img
          src={highlightImg}
          alt="Highlight Event"
          className="w-full h-full object-cover"
        />

     
        {/* <button className="absolute top-1/2 -translate-y-1/2 left-4 bg-white rounded-full p-2 shadow hover:bg-gray-100">
          &#8592;
        </button> */}

        {/* Right Arrow */}
        <button className="absolute top-1/2 -translate-y-1/2  right-2 bg-white font-bold rounded-full px-2 py-2 shadow hover:bg-gray-100">
          &#8594;
        </button>

        {/* Overlay Card */}
        <div className="absolute top-6 left-6 bg-white backdrop-blur-md rounded-lg p-4 h-[290px] w-[445px]">
          <p className="text-pink-500 text-sm mb-1">From $8</p>
          <h3 className="font-bold mt-5 text-2xl mb-2">
            Brushstrokes & Beyond: An Oil <br /> Painting Odyssey
          </h3>
          <div className="flex items-center text-md text-pink-500 mb-4">
            <Calendar size={14} className="mr-1 text-pink-500" />
            Tuesday, June 7 | 06:00 PM
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin size={14} className="mr-1 text-pink-500" />
            2678 Forest Avenue, San Jose, CA 95111
          </div>
          <button className="bg-pink-500 text-white mt-3 px-4 py-2 rounded-md hover:bg-pink-600 transition">
            Purchase Ticket
          </button>
        </div>

      </div>

      {/* More events */}
      <div className="flex justify-between items-center mt-12 mb-6">
        <h2 className="text-xl font-semibold">More events</h2>
        <button className="text-pink-500 text-sm hover:underline">
          View more
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Event Card */}
        {[
          {
            title: "Marathon",
            date: "Monday, June 06 | 06:00 AM",
            location: "New York, NY",
            price: "$10",
            image: marathonImg,
          },
          {
            title: "Rock Festival",
            date: "Monday, March 14 | 04:00 PM",
            location: "New York, NY",
            price: "$100",
            image: rockImg,
          },
          {
            title: "Harmony of Melodies Concert",
            date: "Wednesday, June 24 | 07:00 PM",
            location: "New York, NY",
            price: "Free ticket",
            image: harmonyImg,
          },
        ].map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg  overflow-hidden  transition"
          >
            <div className="relative h-44">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 text-gray-100 text-xl font-bold">
                {event.title}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center text-md text-pink-500 mb-4">
                <Calendar size={14} className="mr-1 text-pink-500" />
                {event.date}
              </div>
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <MapPin size={14} className="mr-1 text-pink-500" />
                {event.location}
              </div>
              <p className="text-pink-500 ml-60 font-semibold">From {event.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
