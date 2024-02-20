// auth.js

const express = require("express");
const bcrypt = require("bcrypt");
const knex = require("knex");

const router = express.Router();

// Initialize Knex connection
const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user from the database based on the provided username
    const user = await db("users").where({ username }).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Authentication successful
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
