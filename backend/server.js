const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Task Manager API is running 🚀"
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