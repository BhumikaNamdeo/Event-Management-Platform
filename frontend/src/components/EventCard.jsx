import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import { API_BASE } from "../config";

const EventCard = ({ event }) => {
  // Safely log the tickets array
  console.log("Tickets:", event.tickets);

    const imageUrl = event.image
    ? `${API_BASE}/uploads/${event.image}`
    : "https://images.unsplash.com/photo-1596949469909-5217f8b68f23?q=80&w=2070";

  // Get lowest price if tickets array exists
  const prices = event.tickets && event.tickets.length > 0 
    ? event.tickets.map(ticket => ticket.price)
    : [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;

  return (

<div className="bg-[#fff] flex p-4 w-full max-w-8xl mt-6 rounded-lg  gap-4">
  {/* Image */}
  <img
    src={imageUrl}
    alt={event.title}
    className="rounded-lg w-200 h-80 object-cover shadow-md"
  />

  {/* Content */}
  <div className="flex flex-col w-full space-y-2">
    {/* Title */}
    <h3 className="text-4xl capitalize ml-5 font-bold text-[#222831] leading-tight">
      {event.title}
    </h3>

    {/* Description */}
    <p className="text-[#222831] ml-5 w-160 font-medium  text-gray-500 leading-snug">
      {event.description}
    </p>
    
    
    {/* Date & Time */}
    <div className="text-lg  ml-5 mt-5 font-semibold text-[#222831] flex items-center gap-10">
   <span>
  <i className="ri-calendar-2-line bg-red-100 rounded-md text-red-300 px-3 py-2 text-md mr-1"></i>
  {new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</span>
    </div>

    <div className="mt-[-35px] font-semibold text-lg ml-80">
      <span><i className="ri-time-line ml-30   bg-red-100 rounded-md text-red-300 px-3 py-2 "></i> {event.time}</span>
    </div>

    {/* Location & Price */}
    <div className="text-[#222831]  flex ml-5 mt-5 items-center gap-30 text-md font-bold">
      <p><i className="ri-map-pin-line bg-red-100 rounded-md text-red-300 px-3 py-2 "></i> {event.venue}</p>
    </div>



     <div className="text-[#222831] ml-90 mt-[-20px]  flex ml-5 mt-5 items-center gap-30 text-md font-bold">
      <p>  <i class="ri-money-rupee-circle-line ml-20   bg-red-100 rounded-md text-red-300 px-3 py-2"></i> {minPrice !== null ? `Price ₹${minPrice}` : "Price not available"}</p>
    </div>

<div className="mt-10">
  <Link
    to={`/organizer/event/${event._id}`}
    className="text-white text-md font-semibold w-full mt-4 text-base bg-[#0b3948] text-center px-3 py-3 rounded block"
  >
    Book Ticket
  </Link>
</div>

 


  </div>
</div>



  );
};

export default EventCard;
