const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "saiket_task6_db"
});

connection.connect((error) => {
    if (error) {
        console.error("Database connection failed:", error.message);
        return;
    }

    console.log("Task 6 MySQL database connected successfully!");
});

module.exports = connection;