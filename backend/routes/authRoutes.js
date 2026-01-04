const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ===== Helpers ===== */
const createAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE
  });

const createRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  });

const isProd = process.env.NODE_ENV === "production";

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });

  res.status(201).json({
    success: true,
    message: "Registration successful. Please login."
  });
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  await Token.create({ userId: user._id, token: refreshToken });

  // ✅ Environment-aware cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  });

  res.json({
    success: true,
    accessToken,
    user: { name: user.name, email: user.email }
  });
});

/* ================= REFRESH ================= */
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  const storedToken = await Token.findOne({ token: refreshToken });
  if (!storedToken)
    return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Expired refresh token" });

    const accessToken = createAccessToken(decoded.id);
    res.json({ accessToken });
  });
});

/* ================= LOGOUT ================= */
router.post("/logout", async (req, res) => {
  await Token.deleteOne({ token: req.cookies.refreshToken });

  res.clearCookie("refreshToken", {
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  });

  res.json({ success: true, message: "Logged out successfully" });
});

/* ================= ME ================= */
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

module.exports = router;
