const express = require("express");
const bcrypt = require("bcrypt");
const db = require('../db.js');

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const role = "member"; // Set the default role to "member"

  try {
    // Check if the user already exists
    const existingUser = await db("users").where({ username }).first();
    if (existingUser) {
      return res.status(409).json({ error: "Username is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await db("users").insert({
      username,
      password: hashedPassword,
      role
    });

    // Registration successful
    return res.status(201).json({ message: "Registration successful", userId: newUser[0] });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
