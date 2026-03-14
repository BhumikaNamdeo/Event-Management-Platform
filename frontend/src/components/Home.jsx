import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  Users,
} from "lucide-react";
import HomePage2 from "../components/HomePage2";
import HomePage3 from "../components/HomePage3";
import Footer from "../components/Footer";
// import heroCrowd from "@/assets/hero-crowd.jpg";
// import marathonEvent from "@/assets/marathon-event.jpg";
// import musicEvent from "@/assets/music-event.jpg";
// import jazzEvent from "@/assets/jazz-event.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const events = [
    {
      id: 1,
      title: "Urban Marathon",
      date: "Monday, June 04",
      time: "08:00 AM",
      location: "New York, NY",
      price: "Free",
      image:
        "https://images.unsplash.com/photo-1549035323-d35c521d1b8b?q=80&w=1142&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Sports",
      attendees: 2500,
      liked: false,
    },
    {
      id: 2,
      title: "Melody Mania",
      date: "Wednesday, June 24",
      time: "07:00 PM",
      location: "New York, NY",
      price: "Free ticket",
      image:
        "https://images.unsplash.com/photo-1570401371773-9eb585a34e4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Music",
      attendees: 1200,
      liked: true,
    },
    {
      id: 3,
      title: "Rockin' the Stage",
      date: "Monday, March 14",
      time: "04:00 PM",
      location: "New York, NY",
      price: "From $150.00",
      image:
        "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Concert",
      attendees: 850,
      liked: false,
    },
  ];

  return (
    <div className="min-h-screen z-[-10] bg-white">
      {/* Hero Section */}
      <section className="relative h-[660px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1651439401606-fd2e05286dcb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="absolute inset-0 w-full   h-full object-cover "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-pink-900/70 z-[-2]" />

        {/* Hero Content */}
        <div className="relative text-center text-white px-6 max-w-8xl mx-auto">
          <h1 className="text-8xl mt-10  mr-80 md:text-9xl font-bold mb-4  font-playfair">
            Pick up your
          </h1>
          <h2 className="text-1xl md:text-9xl ml-30 font-bold text-[#ee8434] mb-8 font-roboto">
            wonderful plans
          </h2>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl z-10 mt-30 p-4 flex flex-col md:flex-row gap-4 max-w-5xl mx-auto shadow-2xl">
            {/* Event Search */}
            <div className="flex-1 flex items-center px-3 py-2 rounded-xl bg-white">
              <Search className="w-5 h-5 text-pink-500 mr-2" />
              <input
                type="text"
                placeholder="Find the event you're interested in"
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
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 z-1 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              New events in <span className="text-purple-600">NYC</span>
            </h3>
            <button className="text-purple-600 hover:underline">
              View more
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 text-gray-800 text-sm px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center">
                      <Heart
                        className={`w-4 h-4 ${
                          event.liked ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </button>
                    <button className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {event.location}
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h4>
                  <div className="space-y-2 text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} attending
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-purple-600">
                      {event.price}
                    </span>
                    <button className="bg-pink-400 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomePage2 />
      <HomePage3 />
      <Footer />
    </div>
  );
};

export default Home;
