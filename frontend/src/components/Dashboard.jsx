import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StatCard from "../components/StatCard";
import SideNavBar from "../components/SideNavBar";
import UserDetail from "../components/UserDetail";
import RecentPurcase from "../components/RecentPurcase";
const OrganizerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalTicketsSold: 0,
    totalRevenue: 0,
    eventGraph: [],
    weeklyChart: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:5000/organizer/dashboard-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const {
    totalEvents,
    upcomingEvents,
    totalTicketsSold,
    totalRevenue,
    eventGraph,
    weeklyChart,
  } = dashboardData;

  return (
    <div>
      <div>
        <SideNavBar />

        <div className="p-6   min-h-screen ml-[280px] bg-[#fff]">
          <h1 className="text-4xl  font-bold mb-6">Welcome, Organizer 🎉</h1>

          <div className="grid   grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-[50px] gap-4 mb-8">
            <StatCard
              title="Total Events"
              value={totalEvents}
              borderColor="border-pink-400"
              bgcolor="bg-red-50"
            />
            <StatCard
              title="Upcoming Events"
              value={upcomingEvents}
              borderColor="border-blue-400"
              bgcolor="bg-blue-100"
            />

            <StatCard
              title="Tickets Sold"
              value={totalTicketsSold}
              borderColor="border-yellow-500"
              bgcolor="bg-yellow-100"
            />

            <StatCard
              title="Revenue"
              value={`₹${totalRevenue}`}
              borderColor="border-green-300" // custom border color
              bgcolor="bg-green-50" // light green background
            />
          </div>

          {/* Buttons */}
          <div className="mb-8 flex gap-4 flex-wrap">
            <Link
              to="/organizer-event"
              className="bg-[#f26a8d] text-white text-lg font-medium  px-4 py-2 rounded"
            >
              + Create New Event
            </Link>
            <Link
              to="/event/view"
              className="bg-[#fb8500] text-white px-4 py-2 text-md font-medium  rounded hover:bg-gray-800"
            >
              View All Events
            </Link>
          </div>

          <UserDetail />

          <RecentPurcase />
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
