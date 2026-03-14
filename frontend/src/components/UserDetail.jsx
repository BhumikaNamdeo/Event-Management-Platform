import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DollarSign } from 'lucide-react';
import { API_BASE } from '../config';

const getStatusBadgeStyle = (color) => {
  const baseClasses = "inline-block whitespace-nowrap px-2 py-2 w-18 rounded text-[12px] font-medium leading-tight";
  const colorVariants = {
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800"
  };
  return `${baseClasses} ${colorVariants[color] || colorVariants.gray}`;
};

const UserDetail = () => {
  const [salesEvents, setSalesEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("sales");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/booking/sale`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSalesEvents(res.data);
      } catch (error) {
        console.error("Error fetching sales stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const sortedEvents = [...salesEvents].sort((a, b) => {
    if (sortBy === "sales") {
      return b.totalRevenue - a.totalRevenue;
    } else if (sortBy === "time") {
      return new Date(b.event?.date) - new Date(a.event?.date);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#fafbfc] p-6 font-sans">
      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div className="p-5 border-b border-gray-200 bg-[#0b3948] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign size={30} className="text-[#fff]" />
            <h2 className="text-3xl font-bold text-[#fff] m-0">Sales by event</h2>
          </div>

          <div className="flex items-center gap-4 text-medium text-white">
         

            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-white font-medium">Sort by:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0b3948] text-white border border-white rounded px-3 py-2"
              >
                <option value="sales">Sales</option>
                <option value="time">Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          {loading ? (
            <p className="py-6 text-center text-gray-500">Loading events...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-lg font-bold text-[#1f363d]">Event</th>
                  <th className="text-left py-3 text-md font-bold text-[#1f363d]">Date of the event</th>
                  <th className="text-left py-3 text-md font-bold text-[#1f363d]">Ticket sold</th>
                  <th className="text-left py-3 text-md font-bold text-[#a4161a]">Revenue</th>
                </tr>
              </thead>

              <tbody>
                {sortedEvents.map((item, index) => {
                  const event = item.event;
                  const imageUrl = event?.image
                    ? `${API_BASE}/uploads/${event.image}`
                    : "https://images.unsplash.com/photo-1596949469909-5217f8b68f23?q=80&w=2070";

                  return (
                    <tr key={index} className="border-b border-gray-200 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-7">
                          <img
                            src={imageUrl}
                            alt={event?.title || "Event Image"}
                            className="w-25 h-15 object-cover border border-[#99e2b4] rounded-md"
                          />
                          <span className="font-bold text-lg text-gray-900">{event?.title}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-900">
                            {new Date(event?.date).toDateString()}
                          </span>
                          <span className={getStatusBadgeStyle("green")}>Complete</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-900">{item?.totalTicketsSold}</td>
                      <td className="py-4 font-medium text-gray-900">₹ {item?.totalRevenue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
