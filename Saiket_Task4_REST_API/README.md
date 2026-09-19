# Task 4 - REST API with Node.js and Express

## Saiket Systems - Full Stack Development Internship

A RESTful API developed using Node.js and Express.js as part of Task 4 of the Full Stack Development Internship.

## Features

- Create a new user
- Get all users
- Get a single user by ID
- Update an existing user
- Delete a user
- JSON request and response handling
- Tested using Postman

## Technologies Used

- Node.js
- Express.js
- JavaScript
- REST API
- Postman

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| POST | `/users` | Create a user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a user by ID |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

## Example User

```json
{
  "name": "Shravani",
  "email": "shravani@example.com",
  "age": 20
}
```

## How to Run

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The API will run at:

```text
http://localhost:3000
```

## Testing

The REST API CRUD operations were tested successfully using Postman.

## Task Requirement

Build a REST API using Node.js and Express.js with CRUD operations for a User entity and test the API using Postman.

## Status

Completed and tested successfully.