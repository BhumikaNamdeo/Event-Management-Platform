import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function Navbar() {
  const [user, setUser] = useState(null); // store user info
  const navigate = useNavigate();

  // On mount, fetch user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <div>
      <nav className="bg-white fixed top-0 left-0 px-10 text-black w-full p-4 flex justify-between items-center z-10 ">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white rounded p-2 bg-gradient-to-r from-pink-500 to-gray-700">
          <Link to="/">Eventify</Link>
        </h1>

        {/* Menu Items */}
        {isLoggedIn && (
          <ul className="hidden md:flex space-x-10 text-lg">
            {/* Common links for all logged-in users */}
            <li className="font-medium hover:text-blue-500">
              <Link to="/">Home</Link>
            </li>
            <li className="font-medium hover:text-blue-500">
              <Link to="/explore">Explore</Link>
            </li>
            <li className="font-medium hover:text-blue-500">
              <Link to="/event/view">Book Show</Link>
            </li>
            <li className="font-medium hover:text-blue-500">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="font-medium hover:text-blue-500">
              <Link to="/contact">Contacts</Link>
            </li>

            {/* Admin-only links */}
            {isAdmin && (
              <>
                <li className="font-medium hover:text-blue-500">
                  <Link to="/organizer/dashboard">Dashboard</Link>
                </li>
               
              </>
            )}
          </ul>
        )}

        {/* Right Side Buttons */}
        <div className="flex gap-6 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-gray-800 font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 font-medium py-3 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-[#0077b6] font-medium text-white px-5 py-3 rounded-md">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      <hr className="border-t-2 border-gray-300 mt-[72px]" />
    </div>
  );
}

export default Navbar;
