
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// GET all doctors
router.get("/", (req, res) => {
    const doctors = db.prepare("SELECT * FROM doctors").all();
    res.json(doctors);
});

// GET doctor by ID
router.get("/:id", (req, res) => {
    const doctor = db.prepare(
        "SELECT * FROM doctors WHERE id = ?"
    ).get(req.params.id);

    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
});


 // POST new doctor with validation
router.post("/", (req, res) => {
    const { name, specialization } = req.body;

    if (!name || !specialization) {
        return res.status(400).json({
            message: "Name and specialization are required"
        });
    }

    if (typeof name !== "string" || typeof specialization !== "string") {
        return res.status(400).json({
            message: "Name and specialization must be text"
        });
    }

    if (!name.trim() || !specialization.trim()) {
        return res.status(400).json({
            message: "Fields cannot contain only spaces"
        });
    }

    try {
        const result = db.prepare(
            "INSERT INTO doctors (name, specialization) VALUES (?, ?)"
        ).run(name.trim(), specialization.trim());

        res.status(201).json({
            message: "Doctor added successfully",
            id: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add doctor"
        });
    }
});

module.exports = router;
