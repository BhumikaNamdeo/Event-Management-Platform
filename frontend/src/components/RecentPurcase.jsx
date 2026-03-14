import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentPurchase = ({ eventId }) => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 7;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/booking/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data.bookings); // 👀 Debug
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <h2 className="text-2xl font-bold text-[#2a0800] mb-4">Recent Purchases</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#0b3948]">
            <tr>
              <th className="px-6 py-4 text-lg text-left font-medium text-white">#</th>
              <th className="px-6 py-4 text-lg text-left font-medium text-white">Booking ID</th>
              <th className="px-6 py-4 text-lg text-left font-medium text-white">Username</th>
              <th className="px-6 py-4 text-lg text-left font-medium text-white">Sold</th>
              <th className="px-6 py-4 text-lg text-left font-medium text-white">Time</th>
              <th className="px-6 py-4 text-lg text-left font-medium text-white">Date</th>
              <th className="px-6 py-4 text-lg text-left font-medium text-white">Total Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentBookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              currentBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td className="px-6 font-medium py-4">{indexOfFirst + index + 1}</td>
                  <td className="px-6 py-4 font-medium text-blue-500">{booking._id}</td>
                  <td className="px-6 py-4 text-[17px] font-medium text-[#2c6e49]">
                    {booking.userId?.name || "N/A"}
                  </td>
                  

                  <td className="px-6 font-medium py-4">
                    {booking.tickets.map((ticket, i) => (
                      <span key={i}>
                        {ticket.quantity}{" "}
                        <span className="text-gray-500">({ticket.name || "Ticket"})</span>
                        {i < booking.tickets.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 font-medium text-orange-600">
                    {new Date(booking.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 font-medium py-4">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#d80032]">
                    ₹
                    {booking.tickets.reduce(
                      (total, ticket) =>
                        total + (ticket.subtotal || ticket.price * ticket.quantity),
                      0
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <hr className="text-gray-500 mt-5" />

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage
                  ? "bg-[#0b3948] text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPurchase;
