const knex = require("knex");
const mariadb = require("knex-mariadb");

// Centralized Knex connection
const db = knex({
  client: mariadb,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

module.exports = db;
