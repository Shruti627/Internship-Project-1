import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-rose-50 to-amber-50">

      <nav className="flex justify-between px-10 py-6">
        <h1 className="text-2xl font-bold">TrustAuth</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-700 hover:underline">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-slate-800 text-white px-5 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-5xl font-extrabold mb-6">
            JWT Authentication<br />
            done <span className="text-sky-600">right</span>
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            A collaborative MERN project focused on secure authentication,
            industry standards, and clean design — built for learning
            version control and real-world practices.
          </p>

          <Link
            to="/register"
            className="bg-slate-800 text-white px-8 py-3 rounded-xl text-lg"
          >
            Start Learning
          </Link>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow space-y-6">
          {[
            "JWT with Bearer Tokens",
            "Secure Express Backend",
            "Protected Routes",
            "Git Collaboration Ready",
            "Industry Folder Structure",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-center">
              <span className="text-green-500">✔</span>
              <p className="text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
