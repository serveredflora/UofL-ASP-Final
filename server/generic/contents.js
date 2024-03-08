const express = require("express");
const db = require("../db.js");

const router = express.Router();

// Route to fetch all contents
router.get("/generic/api/contents", async (req, res) => {
  try {
    const contents = await db("contents").select("*");
    res.status(200).json(contents);
  } catch (error) {
    console.error("Error fetching content data", error);
    res.status(500).json({ message: "Error fetching content data" });
  }
});

module.exports = router;
