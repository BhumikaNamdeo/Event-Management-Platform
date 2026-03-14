import { NavLink } from "react-router-dom";
import { LogOut, PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ClipboardList, CalendarDays, LayoutDashboard } from "lucide-react";







const Sidebar = (event) => {

 const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    console.log("logout");
    
    navigate("/"); 
  }

  return (
    <div className="w-70  h-screen bg-gray-50 fixed  p-4 flex flex-col gap-6">



 <NavLink
        to="/organizer/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 mt-[30px] py-4 rounded-lg font-medium text-lg transition ${
            isActive ? "bg-[#f26a8d] text-[#fff]" : "text-[#463f3a] hover:bg-[#f26a8d] hover:text-[#fff]"
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5text-[#222831]" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/organizer-event"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4  py-4 rounded-lg font-medium text-lg transition ${
            isActive ? "bg-[#f26a8d] text-[#fff]" : " text-[#463f3a] hover:bg-[#f26a8d] hover:text-[#fff]"
          }`
        }
      >
        <PlusCircleIcon className="w-5 h-5text-[#222831]" />
        <span>Create Event</span>
      </NavLink>


      <NavLink
        to="/event/view"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4  py-4 rounded-lg font-medium text-lg transition ${
            isActive ? "bg-[#f26a8d] text-[#fff]" : " text-[#463f3a] hover:bg-[#f26a8d] hover:text-[#fff]"
          }`
        }
      >
        <CalendarDays className="w-5 h-5text-[#222831]" />
        <span>Events View</span>
      </NavLink>



      
    


      

     

      


<button
      onClick={handleLogout}
      className={`flex   items-center mt-[370px] gap-3 px-4 py-4 rounded-lg font-medium text-lg transition
         text-red-500
      `}
    >
      <LogOut className="w-5 h-5  text-red-500" />
      <span>Logout</span>
    </button>



    </div>
  );
};

export default Sidebar;
