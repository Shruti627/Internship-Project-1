import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-white">

      {/* NAV */}
      <nav className="flex justify-between items-center px-12 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          CipherGate
        </h1>
        <div className="space-x-6">
          <Link to="/login" className="opacity-80 hover:opacity-100">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-cyan-500 text-black px-5 py-2 rounded-lg
                       hover:bg-cyan-400 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-12 pt-28 grid md:grid-cols-2 gap-16">
        <div className="animate-fade-in">
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Secure Access <br />
            with <span className="text-cyan-400">CipherGate</span>
          </h2>

          <p className="text-slate-300 text-lg mb-10">
            A production-grade authentication system implementing JWT,
            refresh tokens, session invalidation, and protected APIs —
            built for real-world security.
          </p>

          <Link
            to="/register"
            className="inline-block bg-white text-black px-8 py-3
                       rounded-xl text-lg hover:scale-105 transition"
          >
            Start Exploring
          </Link>
        </div>

        {/* FEATURES */}
        <div className="space-y-6">
          {[
            "JWT Access & Refresh Tokens",
            "Session Invalidation",
            "Secure API Protection",
            "Git Collaboration Ready"
          ].map((item) => (
            <div
              key={item}
              className="bg-white/10 backdrop-blur p-5 rounded-xl
                         hover:translate-x-2 transition"
            >
              ✔ {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
