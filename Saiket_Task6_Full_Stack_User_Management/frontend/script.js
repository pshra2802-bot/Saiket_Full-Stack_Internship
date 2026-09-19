const API_URL = "http://localhost:3002/users";

const userForm = document.getElementById("userForm");
const userId = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");

const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const refreshButton = document.getElementById("refreshButton");

const formTitle = document.getElementById("formTitle");
const userTableBody = document.getElementById("userTableBody");
const message = document.getElementById("message");


// Load users when the page opens
loadUsers();


// Get all users
async function loadUsers() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load users");
        }

        const users = await response.json();

        displayUsers(users);

    } catch (error) {

        message.textContent = "Unable to connect to the server.";
        message.style.color = "red";

        console.error(error);
    }
}


// Display users in table
function displayUsers(users) {

    userTableBody.innerHTML = "";

    if (users.length === 0) {

        userTableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center;">
                    No users found.
                </td>
            </tr>
        `;

        return;
    }

    users.forEach(function(user) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>

            <td>
                <button
                    class="edit-button"
                    onclick="editUser(${user.id})">
                    Edit
                </button>

                <button
                    class="delete-button"
                    onclick="deleteUser(${user.id})">
                    Delete
                </button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}


// Add or update user
userForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const age = ageInput.value;

    if (!name || !email || !age) {

        showMessage("Please fill all fields.", "red");

        return;
    }

    const data = {
        name: name,
        email: email,
        age: Number(age)
    };


    try {

        // Update existing user
        if (userId.value) {

            const response = await fetch(
                `${API_URL}/${userId.value}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            showMessage("User updated successfully.", "green");

        }

        // Add new user
        else {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            showMessage("User added successfully.", "green");
        }


        resetForm();

        loadUsers();

    } catch (error) {

        showMessage(error.message, "red");

        console.error(error);
    }
});


// Edit user
async function editUser(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const user = await response.json();

        userId.value = user.id;
        nameInput.value = user.name;
        emailInput.value = user.email;
        ageInput.value = user.age;

        formTitle.textContent = "Edit User";

        submitButton.textContent = "Update User";

        cancelButton.style.display = "inline-block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        showMessage(error.message, "red");
    }
}


// Delete user
async function deleteUser(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        showMessage("User deleted successfully.", "green");

        loadUsers();

    } catch (error) {

        showMessage(error.message, "red");

        console.error(error);
    }
}


// Cancel editing
cancelButton.addEventListener("click", function() {

    resetForm();

});


// Refresh users
refreshButton.addEventListener("click", function() {

    loadUsers();

});


// Reset form
function resetForm() {

    userForm.reset();

    userId.value = "";

    formTitle.textContent = "Add New User";

    submitButton.textContent = "Add User";

    cancelButton.style.display = "none";
}


// Show message
function showMessage(text, color) {

    message.textContent = text;
    message.style.color = color;

    setTimeout(function() {

        message.textContent = "";

    }, 3000);
}