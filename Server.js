
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Import route files
const doctorRoutes = require("./routes/doctors");
const roomRoutes = require("./routes/rooms");
const bookingRoutes = require("./routes/bookings");

// Connect routes
app.use("/doctors", doctorRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "ClinicQ Health Centre API is running successfully"
    });
});

// Server port
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
