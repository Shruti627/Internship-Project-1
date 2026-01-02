import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 p-12">
        <h1 className="text-4xl font-bold mb-2">
          CipherGate Dashboard
        </h1>
        <p className="text-slate-600 mb-12">
          Your session is protected with modern JWT security 🔐
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Authentication", "JWT access & refresh token flow"],
            ["Security", "Session invalidation & protection"],
            ["Collaboration", "Git-based teamwork & versioning"]
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white p-8 rounded-2xl shadow
                         hover:-translate-y-2 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
