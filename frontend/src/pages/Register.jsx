import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
  try {
    await api.post("/auth/register", form);
    alert("Registered successfully. Please login.");
    navigate("/login");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-2xl w-[420px] shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <div className="space-y-4">
          <input placeholder="Name" className="w-full p-3 border rounded"
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" className="w-full p-3 border rounded"
            onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded"
            onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>

        <button
          onClick={submit}
          className="w-full mt-6 bg-slate-800 text-white py-3 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
