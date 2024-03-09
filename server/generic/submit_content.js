const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const db = require("../db.js");
const fs = require("fs");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const uploadDirectory = path.join(__dirname, "..", "..", "public", "assets", "content", "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage }).single("coverImage");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token is invalid or expired" });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ error: "Authorization header is required" });
  }
};

router.post("/posts/create/submit", verifyToken, (req, res) => {
  console.log("arrived");
  upload(req, res, async (err) => {
    if (err) {
      // Handle upload errors
      return res.status(500).json({ error: `File upload error: ${err.message}` });
    }

    // Extract the user ID from the verified token information
    const username = req.headers.username;
    const user = await db("users").where({ username }).first();
    const userId = user.id;

    // Extract post data from the request body
    const { title, type, languages, description } = req.body;
    if (!title || !type || !languages || !description || !req.file) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const imagePath = `/assets/content/uploads/${req.file.filename}`;
    try {
      // Insert the new content entry into the database
      const [contentId] = await db("contents").insert({
        title,
        type,
        languages,
        description,
        image_path: imagePath,
        user_id: userId,
      });

      // Respond with success message and content ID
      res.status(201).json({
        message: "Content submitted successfully",
        contentId,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to submit content" });
    }
  });
});

module.exports = router;
