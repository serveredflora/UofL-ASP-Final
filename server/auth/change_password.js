const express = require("express");
const bcrypt = require("bcrypt");
const db = require('../db.js');

const router = express.Router();

// Change password route
router.post("/change-password", async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    // Retrieve the user by username
    const user = await db("users").where({ username }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await db("users").where({ username }).update({
      password: hashedNewPassword
    });

    // Password change was successful
    return res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
