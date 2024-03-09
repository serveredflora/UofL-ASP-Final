require("dotenv").config({ path: "../.env" });
const mariadb = require("knex-mariadb");

module.exports = {
  development: {
    client: mariadb,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
