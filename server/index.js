const express = require("express");
const cors = require("cors");

require("dotenv").config();

const path = require("path");
const mariadb = require("mariadb");
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");
const changePasswordRouter = require("./auth/change_password");
const serveContentRouter = require("./serve_content");
// const contents = require("./generic/contents");

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

// Use authRouter for authentication routes
app.use("/auth", loginRouter);
app.use("/auth", registerRouter);
app.use("/auth", changePasswordRouter);
app.use("/generic", serveContentRouter); 

// serveContent.setupContentData();

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

// Query contents table
app.get("/api/content/page/:pageNum", async (req, res) => {
  console.log(`Request received for page: ${req.params.pageNum}`);
  try {
    const page = parseInt(req.params.pageNum, 10) || 1;
    const limit = 15;
    const offset = (page - 1) * limit;

    const contents = await knex("content").select("*").offset(offset).limit(limit);
    const totalCountResult = await knex("content").count("id as count");
    const totalCount = parseInt(totalCountResult[0].count, 10);

    console.log({ page, limit, offset, totalCount });

    res.json({
      data: contents,
      currentPage: page,
      maxPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching content data", error);
    res.status(500).json({ message: "Error fetching content data" });
  }
});

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  try {
    await asyncFunction();
  } catch (err) {
    console.error("Error during database connection test", err);
  }
});
