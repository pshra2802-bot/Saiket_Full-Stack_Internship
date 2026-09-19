const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Saiket Task 6 User Management API is running"
    });
});

// GET - Get all users
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to retrieve users",
                error: error.message
            });
        }

        res.json(results);
    });
});

// POST - Add a new user
app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

    db.query(sql, [name, email, age], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to create user",
                error: error.message
            });
        }

        res.status(201).json({
            message: "User added successfully",
            user: {
                id: result.insertId,
                name,
                email,
                age
            }
        });
    });
});

// GET - Get a single user by ID
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to retrieve user",
                error: error.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(results[0]);
    });
});

// PUT - Update a user
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    const sql = `
        UPDATE users
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `;

    db.query(sql, [name, email, age, id], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to update user",
                error: error.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User updated successfully"
        });
    });
});

// DELETE - Delete a user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to delete user",
                error: error.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Task 6 server is running on http://localhost:${PORT}`);
});