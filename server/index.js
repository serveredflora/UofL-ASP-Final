const express = require("express");
const cors = require("cors");

require("dotenv").config();

const path = require("path");
const mysql = require("mysql2");
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");
const changePasswordRouter = require("./auth/change_password");
const serveContentRouter = require("./serve_content");
const submitContentRouter = require("./generic/submit_content");

const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Authorization", "Content-Type", "Username"],
    origin: "*",
  })
);

app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});

// Use authRouter for authentication routes
app.use("/auth", loginRouter);
app.use("/auth", registerRouter);
app.use("/auth", changePasswordRouter);
app.use("/generic", serveContentRouter);
app.use("/", submitContentRouter);

async function asyncFunction() {
  let conn;
  try {
    conn = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    console.log("Successfully connected to the MariaDB database");
    // DB QUERY
  } catch (err) {
    console.error("Failed to connect to the MariaDB database", err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.end();
      } catch (endError) {
        console.error("Failed to close the database connection", endError);
      }
    }
  }
}

app.use(express.static(path.join(__dirname, "..", "public")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Route all other requests to React app
app.get("*", (req, res) => {
  console.log("Wildcard route hit:", req.url);
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  try {
    await asyncFunction();
  } catch (err) {
    console.error("Error during database connection test", err);
  }
});
