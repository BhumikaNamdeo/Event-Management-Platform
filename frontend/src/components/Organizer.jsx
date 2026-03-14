import React from "react";

const Organizer = () => {
  const organizers = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe123",
      location: "New York",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      location: "Los Angeles",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full h-[400px] bg-amber-300 relative">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Explore Events"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-6xl">
          Organizers
        </h1>
      </div>

      {/* Search Section */}
      <div className="flex items-center justify-center gap-4 text-black p-10 text-xl">
        <input type="text" className="border p-2 rounded-md" placeholder="Enter organizer name" />
        <input type="text" className="border p-2 rounded-md" placeholder="Enter user name" />
        <input type="text" className="border p-2 rounded-md" placeholder="Enter location" />
        <button className="bg-green-400 px-4 py-2 rounded-md text-white hover:bg-green-500 transition">
          Search
        </button>
      </div>

     
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {organizers.map((organizer) => (
          <div key={organizer.id} className="border p-4 rounded-lg shadow-lg flex items-center gap-4">
            <img src={organizer.image} alt={organizer.name} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-xl font-bold">{organizer.name}</h2>
              <p className="text-gray-600">@{organizer.username}</p>
              <p className="text-gray-500">{organizer.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizer;
