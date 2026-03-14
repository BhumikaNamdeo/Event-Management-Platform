import React from "react";
import { Music, Zap, Palette, Briefcase, Camera } from "lucide-react";


import musicEvent from "../assets/img1.png";
import businessEvent from "../assets/img2.png";

const categories = [
  { icon: Music, label: "Music" },
  { icon: Zap, label: "Sport" },
  { icon: Palette, label: "Exibition" },
  { icon: Briefcase, label: "Business" },
  { icon: Camera, label: "Photography" },
];

const events = [
  {
    title: "Musical Fusion Festival",
    date: "Monday, June 06 | 06:00 AM",
    location: "New York, NY",
    price: "$100",
    image: musicEvent,
   
  },
  {
    title: "Creating a Thriving Business in the United States",
    date: "Tuesday, June 07 | 06:00 AM",
    location: "Atlanta",
    price: "$50",
    image:businessEvent,
  },
];

export default function EventPage() {
  return (
    <div className="px-8 py-10 font-sans max-w-7xl mx-auto">
      {/* Categories */}
      <h2 className="text-4xl font-bold mb-10">
        Explore by <span className="text-pink-500">categories</span>
      </h2>

      <div className="flex gap-25 mb-15 flex-wrap">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="w-40 h-20 flex flex-col items-center justify-center bg-gray-100  rounded-lg cursor-pointer  transition"
          >
            <cat.icon className="text-pink-500 w-6 h-8 mb-2" />
            <span className="text-md font-medium">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold">
          Upcoming <span className="text-pink-500">in 24h</span>
        </h2>
        <button className="text-pink-500 text-md font-medium hover:underline">
          View more
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg  overflow-hidden  transition"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg  font-bold mb-2">{event.title}</h3>
              <p className="text-md font-semibold text-pink-500 mb-1">{event.date}</p>
              <p className="text-sm text-gray-400">{event.location}</p>
              <p className="text-pink-500 ml-120  font-semibold mt-2">
                From {event.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
