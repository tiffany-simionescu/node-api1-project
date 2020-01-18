// implement your API here
const express = require('express');

const server = express();

// STRETCH - Define Cors
const cors = require('cors');

// Middleware
server.use(express.json());

//STRETCH - Cors Middleware
server.use(cors());

// Import DB
let db = require('./data/db');

// === Addition Enpoint for Heroku === //

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to my API",
    cohort: process.env.LAMBDA_SCHOOL,
    secret: process.env.SUPER_SECRET_API_KEY
  })
})  

// === Required Endpoints === //

// POST - /api/users - adds user
server.post("/api/users", (req, res) => {
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
server.get("/api/users", (req, res) => {
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
server.get("/api/users/:id", (req, res) => {
  const userID = req.params.id;

  db.findById(userID)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error(err);
      if(!userID) {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
      } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
      }
    })
});

// DELETE - /api/users/:id - deletes user
server.delete("/api/users/:id", (req, res) => {
  const userID = req.params.id;

  db.remove(userID)
    .then(userDeleted => {
      res.status(200).json(userDeleted)
      if(!userDeleted) {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ errorMessage: "The user could not be removed." })
})
});

// PUT - /api/users/:id - edits user
server.put("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  const { name, bio } = req.body;

  if(!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }

  db.update(userID, { name, bio })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.error(err);
      if(!userID) {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
      } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
      }
    })
});

// const port = 8000;
// const host = "127.0.0.1";

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8080;

server.listen(port, host, () => {
  console.log(`API running at http://${host}:${port}`);
});