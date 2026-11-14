
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// GET all bookings
router.get("/", (req, res) => {
    const bookings = db.prepare(`
        SELECT bookings.*,
               doctors.name AS doctor_name,
               rooms.name AS room_name
        FROM bookings
        JOIN doctors ON bookings.doctor_id = doctors.id
        JOIN rooms ON bookings.room_id = rooms.id
    `).all();

    res.json(bookings);
});

// GET booking by ID
router.get("/:id", (req, res) => {
    const booking = db.prepare(
        "SELECT * FROM bookings WHERE id = ?"
    ).get(req.params.id);

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    res.json(booking);
});

// POST new booking
router.post("/", (req, res) => {
    const {
        doctor_id,
        room_id,
        booking_date,
        booking_time
    } = req.body;

    if (!doctor_id || !room_id || !booking_date || !booking_time) {
        return res.status(400).json({
            message: "All booking fields are required"
        });
    }

    try {
        const result = db.prepare(`
            INSERT INTO bookings
            (doctor_id, room_id, booking_date, booking_time)
            VALUES (?, ?, ?, ?)
        `).run(doctor_id, room_id, booking_date, booking_time);

        res.status(201).json({
            message: "Booking created successfully",
            id: result.lastInsertRowid
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE booking
router.delete("/:id", (req, res) => {
    const result = db.prepare(
        "DELETE FROM bookings WHERE id = ?"
    ).run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    res.json({ message: "Booking deleted successfully" });
});

module.exports = router;
