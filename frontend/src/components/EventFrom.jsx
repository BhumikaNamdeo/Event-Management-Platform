import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNavBar from "../components/SideNavBar";
import { API_BASE } from "../config";

function EventForm() {
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [image, setImage] = useState(null);
    const [tickets, setTickets] = useState([{ type: "", price: "", quantity: "" }]);

    const navigate = useNavigate();

    const [ticketsArray, setTicketsArray] = useState([null]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("date", date);
            formData.append("time", time);
            formData.append("venue", venue);
            formData.append("image", image);

            const cleanedTickets = tickets.filter(ticket => ticket && ticket.type && ticket.price);
            formData.append("tickets", JSON.stringify(cleanedTickets));

            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token);

            const response = await fetch(`${API_BASE}/event/create/event`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: "include"
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("🎉 Event Created Successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                });
                setTitle("");
                setDescription("");
                setDate("");
                setTime("");
                setVenue("");
                setImage(null);
                setTickets([{ type: "", price: "", quantity: "" }]);

                setTimeout(() => {
                    navigate("/event/view");
                }, 2000);
            } else {
                toast.error(data.message || "Failed to create event", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error("Error: " + error.message, {
                position: "top-right",
                autoClose: 3000,
            });
            console.error("Event creation error:", error);
        }
    };

    const handleTicketChange = (index, field, value) => {
        const newTickets = [...tickets];
        newTickets[index][field] = value;
        setTickets(newTickets);
    };

    const addTicketType = () => {
        setTickets([...tickets, { type: "", price: "", quantity: "" }]);
    };

    const removeTicketType = (index) => {
        const newTickets = tickets.filter((_, i) => i !== index);
        setTickets(newTickets);
    };

    return (
        <div className="flex  min-h-screen bg-[#fff]">
            <SideNavBar />
          

            <main className="flex-1 p-8 ml-[100px]">
                <ToastContainer />
                 
                <form onSubmit={handleSubmit} className="max-w-9xl mx-auto mt-[-20px]  border-gray-400 ml-45 rounded-xl p-2 bg-white">
                 <div className="space-y-5 text-lg">
                 <h1 className=" text-2xl font-bold text-white text-center   rounded-md  bg-[#0b3948] px-3 py-3 ">Create an Event</h1>

                    



      {/* Event Title */}
      <div>
        <label className="block mb-1 mt-5 text-xl font-bold">Event Title*</label>
        <label className="block mb-1 text-gray-400  text-[14px] ">Make it catchy and memorable.</label>

        <input
          type="text"
          placeholder="Enter event title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border bg-white border-gray-400 rounded px-4 py-2"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 text-xl font-bold">Description*</label>
          <label className="block mb-1 text-gray-400  text-[14px]">Provide essential event detail.</label>
        <textarea
          value={description}
          placeholder="Write something here...."
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border bg-white border-gray-400 rounded px-4 py-2"
        />
      </div>

      {/* Date & Time */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block mb-1 font-semibold">Date</label>
          <label className="block mb-1 text-gray-400  text-[14px]"> Choose the start time and end time for your event</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border bg-white border-gray-400 rounded px-4 py-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-1 font-semibold">Time</label>
          <label className="block mb-1 text-gray-400  text-[14px]"> Choose the start time and end time for your event</label>

         
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full border bg-white border-gray-400 rounded px-4 py-2"
          />
        </div>
      </div>

      {/* Venue */}
      <div>
        <label className="block mb-1 font-semibold">Venue</label>
          <label className="block mb-1 text-gray-400  text-[14px]">You can choose the location or pinpoint it on the map</label>

        <input
        placeholder="Enter Location"
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
          className="w-full border border-gray-400 rounded bg-white px-4 py-2"
        />
      </div>
    
                        

                        <div>
                            <label className="block font-semibold mb-1">Event Image</label>
          <label className="block mb-1 text-gray-400  text-[14px]">  Upload images for your event</label>


                          
                            <input
                                type="file"
                                accept="image/*"
                                className="border  border-gray-400 px-4 py-3 rounded-md cursor-pointer bg-white"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Ticket Types</label>
                            {tickets.map((ticket, index) => (
                                <div key={index} className="flex gap-2 mb-2 items-center">
                                    <input
                                        type="text"
                                        placeholder="Type (e.g. VIP)"
                                        className="border border-gray-400  p-2 rounded flex-1 bg-white"
                                        value={ticket.type}
                                        onChange={(e) => handleTicketChange(index, "type", e.target.value)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        className="border  border-gray-400 p-2 rounded w-24 bg-white"
                                        value={ticket.price}
                                        onChange={(e) => handleTicketChange(index, "price", e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
                                        onClick={() => removeTicketType(index)}
                                        disabled={tickets.length === 1}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTicketType}
                                className="bg-[#f26a8d] mt-4 text-white px-4 py-3 rounded-md cursor-pointer"
                            >
                                + Add Ticket Type
                            </button>
                        </div>

                        <div className="flex mt-6">
                            <button
                                type="submit"
                                className="bg-[#0b3948] w-full text-white px-8 py-4 rounded-md cursor-pointer text-lg font-semibold"
                            >
                                Create Event
                            </button>

                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

function InputField({ label, value, setValue, type = "text", required }) {
    return (
        <div className="flex-1">
            <label className="block font-semibold mb-1">{label}</label>
            <input
                type={type}
                className="w-full border p-3 rounded-md bg-white"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={required}
            />
        </div>
    );
}

function TextAreaField({ label, value, setValue, required }) {
    return (
        <div>
            <label className="block font-semibold mb-1">{label}</label>
            <textarea
                className="w-full border p-3 rounded-md bg-white"
                rows={3}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={required}
            />
        </div>
    );
}

export default EventForm;
