require("dotenv").config();

const express = require("express");
const path = require("path");
const mariadb = require("mariadb");
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register"); 

const app = express();
const port = 8000;
app.use(express.json());

// Use authRouter for authentication routes
app.use("/auth", loginRouter);
app.use("/auth", registerRouter);

async function asyncFunction() {
  let conn;
  try {
    conn = await mariadb.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
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

// Route all other requests to React app
app.get("*", (req, res) => {
  console.log("Wildcard route hit:", req.url);
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  try {
    await asyncFunction(); // Debug db connect
  } catch (err) {
    console.error("Error during database connection test", err);
  }
});
