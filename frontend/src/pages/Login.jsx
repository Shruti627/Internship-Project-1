import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { FaArrowLeft } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/login", { email, password });
    console.log(res.data); // check API response

    if (res.data.message === "Login Successful" && res.data.user) {
      // store user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard"); // ✅ redirect
    } else {
      setError(res.data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  }
};


  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-5">
      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white md:col-span-3">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Welcome Back! <br />
          <span className="text-indigo-400">We Missed You!</span>
        </h1>
        <p className="text-gray-300 mt-4 text-lg max-w-lg">
          Enter your credentials to access your secure dashboard.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col justify-center items-center bg-gray-50 relative md:col-span-2">
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <FaArrowLeft /> Back
        </Link>

        <div className="w-full max-w-sm p-6 rounded-xl bg-white border mt-10 md:mt-0 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              placeholder="Email"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-all"
            >
              🔑 Login Now
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
