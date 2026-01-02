import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 p-10">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-600 mb-10">
          You are authenticated using JWT 🎯
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            ["JWT Auth", "Bearer token based authentication"],
            ["Security", "Helmet, rate limiting enabled"],
            ["Collaboration", "Git version control learning"],
          ].map(([title, desc], i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-slate-600">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Project Objective</h2>
          <p className="text-slate-600 leading-relaxed">
            This project demonstrates secure JWT authentication, protected
            routes, and frontend-backend integration while practicing
            Git collaboration and industry-level code structure.
          </p>
        </div>
      </div>
    </>
  );
}
