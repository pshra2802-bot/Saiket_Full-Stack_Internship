const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3001;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Saiket Task 5 Database API is running"
    });
});

// CREATE - Add a new user
app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

    db.query(sql, [name, email, age], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to create user",
                error: error.message
            });
        }

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: result.insertId,
                name: name,
                email: email,
                age: age
            }
        });
    });
});

// READ - Get all users
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

// READ - Get one user by ID
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

// UPDATE - Update a user
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age } = req.body;

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
    console.log(`Server is running on http://localhost:${PORT}`);
});