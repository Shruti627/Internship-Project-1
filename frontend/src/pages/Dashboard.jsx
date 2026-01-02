import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null; // prevent rendering before user is loaded

  return (
  <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
    <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center border border-gray-200">
      
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
        Welcome, <span className="text-purple-600">{user.name}</span> 👋
      </h1>

      <p className="text-gray-500 text-sm mb-6">
        Logged in as <span className="font-medium">{user.email}</span>
      </p>

      <div className="h-[1px] bg-gray-200 mb-6"></div>

      <button
        onClick={logout}
        className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold tracking-wide hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-md"
      >
        Logout
      </button>
    </div>
  </div>
);

}
