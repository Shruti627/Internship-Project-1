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

app.use(
  cors({
    origin: [
      "http://localhost:5173",          // local frontend
      "https://your-frontend.vercel.app" // Vercel frontend (replace later)
    ],
    credentials: true
  })
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000
  })
);

/* ===== Database ===== */
connectDB();

/* ===== Routes ===== */
app.use("/api/auth", require("./routes/authRoutes"));

/* ===== Server ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
