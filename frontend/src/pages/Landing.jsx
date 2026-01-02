import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col">

      {/* NAVBAR */}
      <div className="flex justify-between items-center py-6 px-6 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold hover:text-indigo-400 transition">
          MERN Auth
        </div>

        <div className="hidden md:flex gap-6 items-center text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/login">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all duration-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 border border-gray-400 hover:bg-white hover:text-black rounded-lg transition-all duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col justify-center items-center text-center flex-1 px-6">

        <p className="uppercase tracking-widest text-sm text-gray-300 mb-3">
          Secure & Modern Authentication
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Welcome to <span className="text-indigo-400">MERN Auth</span>
        </h1>

        <p className="text-gray-300 mt-4 text-lg max-w-2xl">
          Build and manage your accounts securely and effortlessly. 
          Register, Login & access your personalized dashboard in seconds.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/login">
            <button className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg hover:scale-105">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-8 py-3 rounded-xl border border-gray-400 hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:scale-105">
              Register
            </button>
          </Link>
        </div>

        <p className="mt-12 text-gray-400 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-400 font-semibold hover:underline">Login Now</Link>
        </p>
      </div>
      
    </div>
  );
}
