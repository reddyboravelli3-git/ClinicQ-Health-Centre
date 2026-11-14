
const { DatabaseSync } = require("node:sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "clinicq.db");

// Create or connect to the database
const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec("PRAGMA foreign_keys = ON");

// Create tables
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
