const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

/* REGISTER */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(409).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  res.status(201).json({
    message: "Registration successful. Please login.",
  });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // true in production
      maxAge: 60 * 60 * 1000,
    })
    .json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
});

/* LOGOUT */
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

/* AUTH CHECK */
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

module.exports = router;
