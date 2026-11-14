
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

// POST new doctor
router.post("/", (req, res) => {
    const { name, specialization } = req.body;

    if (!name || !specialization) {
        return res.status(400).json({
            message: "Name and specialization are required"
        });
    }

    const result = db.prepare(
        "INSERT INTO doctors (name, specialization) VALUES (?, ?)"
    ).run(name, specialization);

    res.status(201).json({
        message: "Doctor added successfully",
        id: result.lastInsertRowid
    });
});

module.exports = router;
