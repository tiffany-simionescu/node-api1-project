// implement your API here
const express = require('express');
const api = express();

// Middleware
api.use(express.json());

// Import DB
let db = require('./data/db');
let users = require('./data/seeds/users');

// === Required Endpoints === //

// POST - /api/users - adds user
api.post("/api/users", (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
      return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } 
  db.insert({name, bio})
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    })
});

// GET - /api/users - all users
api.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ errorMessage: "The user info cannot be retrieved" })
    })
});

// GET - /api/users/:id - specific user
// ADD THE FOLLOWING:
//  res.status(500).json({ errorMessage: "The user information could not be retrieved." })

api.get("/api/users/:id", (req, res) => {
  const userID = req.params.id;

  db.findById(userID)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    })
});

// DELETE - /api/users/:id - deletes user

// PUT - /api/users/:id - edits user

const port = 8000;
const host = "127.0.0.1";

api.listen(port, host, () => {
  console.log(`API running at http://${host}:${port}`);
});