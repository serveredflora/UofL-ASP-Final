const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET;

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
    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" } // Token expires in 24 hour
    );

    return res.status(200).json({
      message: "Login successful",
      user: { username: user.username, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
