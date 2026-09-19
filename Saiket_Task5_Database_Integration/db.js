const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "saiket_task5_db"
});

connection.connect((error) => {
    if (error) {
        console.error("Database connection failed:", error.message);
        return;
    }

    console.log("MySQL database connected successfully!");
});

module.exports = connection;