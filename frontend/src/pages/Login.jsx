import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../api/axios";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { showToast } = useToast();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", form);
      setAccessToken(res.data.accessToken);
      showToast("Login successful");
      navigate("/dashboard");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Login failed",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="bg-white p-10 rounded-3xl w-[420px] shadow-xl
                      hover:shadow-2xl transition">

        <h2 className="text-3xl font-bold mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-center text-slate-500 mb-8">
          Access CipherGate securely
        </p>

        <div className="space-y-5">
          <input
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border
                       focus:ring-2 focus:ring-cyan-400"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border
                       focus:ring-2 focus:ring-cyan-400"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={submit}
          className="w-full mt-8 bg-slate-900 text-white py-3
                     rounded-xl hover:bg-slate-800 transition"
        >
          Login
        </button>

        <div className="mt-6 flex justify-between text-sm">
          <Link to="/" className="text-slate-500 hover:underline">
            ← Home
          </Link>
          <Link to="/register" className="text-cyan-600 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
