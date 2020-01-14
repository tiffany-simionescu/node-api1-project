// implement your API here
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Import DB
let db = require('./data/db');
let users = require('./data/seeds/users');

// === Required Endpoints === //

// POST - /api/users - adds user
app.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  } 

  const newUser = {
    id: Date.now(),
    name: req.body.name,
    bio: req.body.bio,
    created_at: Date.now(),
    updated_at: Date.now()
  }

  db.insert(newUser);
  res.status(201).json(newUser);

  // If there's an error while saving the user:
  if(!db.push(newUser)) {
    return res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
  }
});

// GET - /api/users - all users

// GET - /api/users/:id - specific user

// DELETE - /api/users/:id - deletes user

// PUT - /api/users/:id - edits user

const port = 8000;
const host = "127.0.0.1";

app.listen(port, host, () => {
  console.log(`API running at http://${host}:${port}`);
});