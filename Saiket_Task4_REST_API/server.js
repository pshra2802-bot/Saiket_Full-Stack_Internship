const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary user data
let users = [
    {
        id: 1,
        name: "Shravani",
        email: "shravani@example.com",
        age: 20
    }
];

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Saiket Task 4 REST API is running"
    });
});

// CREATE - Add a new user
app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        age: age
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

// READ - Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// READ - Get one user by ID
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// UPDATE - Update a user
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;

    res.json({
        message: "User updated successfully",
        user: user
    });
});

// DELETE - Delete a user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const userExists = users.some((user) => user.id === id);

    if (!userExists) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users = users.filter((user) => user.id !== id);

    res.json({
        message: "User deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});