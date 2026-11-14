
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// Connect to the existing database
const dbPath = path.join(__dirname, "clinicq.db");

if (!fs.existsSync(dbPath)) {
    throw new Error("Existing clinicq.db file not found!");
}

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

// Initialize tables if they do not already exist
db.exec(`
    CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialization TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        floor INTEGER NOT NULL,
        UNIQUE(name, floor)
    );

    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        room_id INTEGER NOT NULL,
        booking_date TEXT NOT NULL,
        booking_time TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        FOREIGN KEY (doctor_id) REFERENCES doctors(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
    );
`);

console.log("ClinicQ database connected successfully!");

module.exports = db;
