import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "http://localhost:5000/user/register"
      : "http://localhost:5000/user/login";

    const payload = isSignup
      ? { name, email, password, role }
      : { email, password };

    try {
      const res = await axios.post(url, payload);
      console.log("Response:", res.data);

      if ((res.status === 200 || res.status === 201) && res.data.token) {
        // Save token & user info in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role || "user", // backend se role
          })
        );

        // Navigate based on role
        if (res.data.role === "admin") {
          navigate("/organizer/dashboard");
        } else {
          navigate("/"); // User goes to home page
        }

        window.location.reload();
      } else {
        alert("Login/Register failed: Token not received.");
      }
    } catch (err) {
      console.error("Login/Register Error:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-400 to-blue-800 px-4 py-10">
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 shadow-xl rounded-3xl w-full max-w-6xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">
        {/* Left Side */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] flex flex-col justify-center items-center p-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {isSignup ? "Welcome!" : "Welcome Back!"}
          </h2>
          <p className="text-white text-lg max-w-sm">
            {isSignup
              ? "Create an account to unlock amazing features."
              : "Login to access your personalized dashboard."}
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 sm:p-12 bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              {isSignup ? "Sign Up" : "Login"}
            </h2>
            <p className="text-md text-gray-500">
              {isSignup ? "Join our community today." : "Let's get you logged in."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/90"
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/90"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/90"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/90"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 transition duration-300 text-white font-semibold rounded-xl shadow-md"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-700">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:underline font-semibold ml-1"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
