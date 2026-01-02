import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
  try {
    await api.post("/auth/login", form);
    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-2xl w-[420px] shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <div className="space-y-4">
          <input placeholder="Email" className="w-full p-3 border rounded"
            onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded"
            onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>

        <button
          onClick={submit}
          className="w-full mt-6 bg-slate-800 text-white py-3 rounded"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <Link to="/register" className="text-sky-600">Create account</Link>
        </p>
      </div>
    </div>
  );
}
