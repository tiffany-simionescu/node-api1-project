// implement your API here
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Import DB
let db = require('./data/db');

// === Required Endpoints === //

// POST - /api/users - adds user

// GET - /api/users - all users

// GET - /api/users/:id - specific user

// DELETE - /api/users/:id - deletes user

// PUT - /api/users/:id - edits user