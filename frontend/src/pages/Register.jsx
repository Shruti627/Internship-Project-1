import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await api.post("/register", { name, email, password });
    alert(res.data.message);

    if (res.data.message === "Registered Successfully") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-5">

      {/* LEFT PANEL - 3/5 */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white md:col-span-3">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          New Here? <br />
          <span className="text-indigo-400">Let's Get You Started!</span>
        </h1>

        <p className="text-gray-300 mt-4 text-lg max-w-lg">
          Join our secure MERN platform and manage your account effortlessly.
          Fast, reliable, and designed for modern users like you.
        </p>

        <div className="mt-10 space-y-3 text-gray-300">
          <p>🚀 Quick Registration</p>
          <p>🔐 Encrypted & Secure</p>
          <p>⚡ Instant Dashboard Access</p>
          <p>🎯 Smooth & Modern UX</p>
        </div>

        <p className="mt-10 text-gray-400 italic max-w-md">
          Already onboarded? Head to Login and continue your journey!
        </p>
      </div>

      {/* RIGHT PANEL - 2/5 */}
      <div className="flex flex-col justify-center items-center bg-gray-50 relative md:col-span-2">

        {/* BACK TO HOME BUTTON */}
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <FaArrowLeft /> Back
        </Link>

        <div className="w-full max-w-sm p-6 rounded-xl bg-white border mt-10 md:mt-0 shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
    Create Account
  </h2>

  <p className="text-center text-gray-500 mb-6 text-sm">
    Fill in your details and start your journey!
  </p>

  <form onSubmit={handleRegister} className="space-y-3">
    <input
      placeholder="Full Name"
      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onChange={(e) => setName(e.target.value)}
    />

    <input
      placeholder="Email"
      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      placeholder="Password"
      type="password"
      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="submit"
      className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-all"
    >
      🚀 Register Now
    </button>
  </form>

  <p className="text-center mt-4 text-gray-600 text-sm">
    Already have an account?{" "}
    <Link to="/login" className="text-indigo-600 hover:underline">
      Login
    </Link>
  </p>
</div>

      </div>
    </div>
  );
}
