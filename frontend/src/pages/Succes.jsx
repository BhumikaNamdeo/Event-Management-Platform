import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL se bookingId fetch karo
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");
  console.log("Booking ID from URL:", bookingId);

  // Payment status update (optional)
  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        if (bookingId) {
          const res = await axios.post(
            `${API_BASE}/payment/update-status`,
            { bookingId }
          );
          console.log("Payment status updated:", res.data);
        } else {
          console.warn("Booking ID missing in URL");
        }
      } catch (error) {
        console.error("Error updating payment status", error);
      }
    };
    updatePaymentStatus();
  }, [bookingId]);

  // Ticket download handler
  const handleDownload = async () => {
    if (!bookingId) {
      alert("Booking ID missing. Cannot download ticket.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE}/payment/ticket/${bookingId}`,
        {
          responseType: "blob", // PDF receive karne ke liye
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // PDF download logic
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket_${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => {
        navigate("/explore");
      }, 2000); // 2 seconds ka delay taaki download start ho sake
    } catch (error) {
      console.error("Failed to download ticket", error);
      alert("Failed to download ticket.");
    }
  };

  const handleBack = () => {
    navigate("/explore", { state: { paymentSuccess: true } });
  };

  return (
    <div className="text-center h-screen bg-gray-300 flex flex-col items-center justify-center">
      <div className="bg-green-700 px-8 py-12 text-white rounded-md shadow-lg w-full max-w-6xl">
        <h2 className="text-white">
          <span className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white">
            <i className="ri-check-line font-bold text-green-600 text-6xl"></i>
          </span>
        </h2>

        <h1 className="text-6xl font-bold mt-5 text-white">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-100">
          Thank you for your payment. You can now download your event ticket.
        </p>

        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-white text-black font-bold cursor-pointer rounded hover:bg-gray-200 transition"
          >
            Download Ticket
          </button>

          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white text-black font-bold cursor-pointer rounded hover:bg-gray-200 transition"
          >
            Continue
          </button>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h1 className="font-medium">
          If you face any issue, our support team is here 24/7 to assist you.
        </h1>
        <h2 className="font-medium mt-2">© 2025.Done</h2>
      </div>
    </div>
  );
};

export default PaymentSuccess;
