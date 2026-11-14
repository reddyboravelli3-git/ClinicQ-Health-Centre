
const db = require("./database/database");

db.all(
    "SELECT name FROM sqlite_master WHERE type='table'",
    (err, tables) => {
        if (err) {
            console.error("Database test failed:", err.message);
        } else {
            console.log("Database tables:");
            console.log(tables);
        }

        db.close();
    }
);
