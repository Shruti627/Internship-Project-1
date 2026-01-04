const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

/* ===== Middleware ===== */
app.use(express.json());
app.use(cookieParser());

// ✅ CORS — works for localhost + Vercel
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://internship-project-1-theta.vercel.app"
    ],
    credentials: true
  })
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
  })
);

/* ===== Database ===== */
connectDB();

/* ===== Routes ===== */
app.use("/api/auth", require("./routes/authRoutes"));

/* ===== Health Check (optional but useful) ===== */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* ===== Server ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
