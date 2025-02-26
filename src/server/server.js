import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

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

// ✅ MySQL Database Connection Pool
const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// ✅ JWT Helper Function
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
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

    // Check if email already exists
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0)
      return res.status(400).json({ message: "Email already in use" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert New User
    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

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

    // Check if user exists
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0)
      return res.status(401).json({ message: "Invalid email or password" });

    const user = users[0];

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = generateToken(user);

    // Send Token in Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, isAdmin: user.isAdmin },
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

app.post("/apply", upload.single("documents"), async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dob,
      contactNumber,
      email,
      address,
      course,
      guardianName,
      guardianContact,
      roomPreference,
    } = req.body;
    const documentPath = req.file ? req.file.path : null;
    const role = "user"; // Default role

    if (
      !fullName ||
      !gender ||
      !dob ||
      !contactNumber ||
      !email ||
      !address ||
      !course ||
      !guardianName ||
      !guardianContact ||
      !roomPreference
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const [result] = await db.execute(
      `INSERT INTO applications (fullName, gender, dob, contactNumber, email, address, course, guardianName, guardianContact, roomPreference, documentPath, role) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        gender,
        dob,
        contactNumber,
        email,
        address,
        course,
        guardianName,
        guardianContact,
        roomPreference,
        documentPath,
        role,
      ]
    );

    res.json({
      message: "✅ Application submitted successfully!",
      id: result.insertId,
    });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});


/* =============================== */
/* 🚀 COMPLAINTS API 🚀 */
/* =============================== */

app.post("/api/complaints", async (req, res) => {
  const { name, email, complaintType, description } = req.body;

  if (!name || !email || !complaintType || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO complaints (name, email, complaintType, description) VALUES (?, ?, ?, ?)",
      [name, email, complaintType, description]
    );

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .json({ message: "Complaint submitted successfully!" });
    } else {
      return res.status(500).json({ message: "Failed to submit complaint." });
    }
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


/* =============================== */
/* 🚀 CONTACT FORM API 🚀 */
/* =============================== */

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    res.json({ message: "✅ Message sent successfully!", id: result.insertId });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

/* =============================== */
/* 🚀 EVENT REGISTRATION SYSTEM 🚀 */
/* =============================== */

app.post("/register-event", async (req, res) => {
  const { fullName, email, phone, gender, eventType, comment } = req.body;

  if (!fullName || !email || !phone || !gender || !eventType) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO event_registrations (fullName, email, phone, gender, eventType, comment) VALUES (?, ?, ?, ?, ?, ?)",
      [fullName, email, phone, gender, eventType, comment]
    );
    res.json({ message: "✅ Registration Successful!", id: result.insertId });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Fetch All Event Registrations
app.get("/events", async (req, res) => {
  try {
    const [events] = await db.execute(
      "SELECT * FROM event_registrations ORDER BY created_at DESC"
    );
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
