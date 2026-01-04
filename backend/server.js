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

const allowedOrigins = [
  "http://localhost:5173",            // local frontend
  "https://your-frontend.vercel.app" // replace with actual Vercel URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
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
