import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import connectDB from "./db.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", // Add multiple frontend origins if needed
  process.env.CLIENT_URL, // Use env for production frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Ensure uploads directory exists
const uploadDir = process.env.UPLOADS_DIR || "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

// ✅ JWT Helper Function
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* =============================== */
/* 🚀 AUTH ROUTES (Signup, Login, Logout) 🚀 */
/* =============================== */

// ✅ Signup Route
app.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login Route
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Logout Route
app.post("/auth/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logout successful" });
});

/* =============================== */
/* 🚀 HOSTEL APPLICATION FORM 🚀 */
/* =============================== */

const applicationSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  dob: String,
  contactNumber: String,
  email: String,
  address: String,
  course: String,
  guardianName: String,
  guardianContact: String,
  roomPreference: String,
  documentPath: String,
  role: { type: String, default: "user" },
});

const Application = mongoose.model("Application", applicationSchema);

app.post("/apply", upload.single("documents"), async (req, res) => {
  try {
    const newApplication = new Application({
      ...req.body,
      documentPath: req.file ? req.file.path : null,
    });
    await newApplication.save();
    res.json({ message: "✅ Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

/* =============================== */
/* 🚀 COMPLAINTS API 🚀 */
/* =============================== */

const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  complaintType: String,
  description: String,
});

const Complaint = mongoose.model("Complaint", complaintSchema);

app.post("/api/complaints", async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* =============================== */
/* 🚀 CONTACT FORM API 🚀 */
/* =============================== */

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

app.post("/api/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

/* =============================== */
/* 🚀 EVENT REGISTRATION SYSTEM 🚀 */
/* =============================== */

const eventRegistrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  gender: String,
  eventType: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);

app.post("/register-event", async (req, res) => {
  try {
    const newRegistration = new EventRegistration(req.body);
    await newRegistration.save();
    res.json({ message: "✅ Registration Successful!" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Fetch All Event Registrations
app.get("/events", async (req, res) => {
  try {
    const events = await EventRegistration.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

/* =============================== */
/* 🚀 STARTING SERVER 🚀 */
/* =============================== */
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
