
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// GET all rooms
router.get("/", (req, res) => {
    const rooms = db.prepare("SELECT * FROM rooms").all();
    res.json(rooms);
});

// GET room by ID
router.get("/:id", (req, res) => {
    const room = db.prepare(
        "SELECT * FROM rooms WHERE id = ?"
    ).get(req.params.id);

    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
});

// POST new room
router.post("/", (req, res) => {
    const { name, floor } = req.body;

    if (!name || !Number.isInteger(Number(floor)) || Number(floor) <= 0) {
        return res.status(400).json({
            message: "Valid room name and floor are required"
        });
    }

    try {
        const result = db.prepare(
            "INSERT INTO rooms (name, floor) VALUES (?, ?)"
        ).run(name, Number(floor));

        res.status(201).json({
            message: "Room added successfully",
            id: result.lastInsertRowid
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
