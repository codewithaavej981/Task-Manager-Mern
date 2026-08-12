
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const protect = require("./middleware/authMiddleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Task Manager API is running 🚀"
    });
});

app.get("/api/auth/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You have access to this protected route",
    userId: req.user.userId,
  });
});

// 404 route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});