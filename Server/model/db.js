const { Pool, Client } = require("pg");

const dbConfig = require("../config/db.config.js");

const connection = new Pool({
    host: dbConfig.PGHOST,
    user: dbConfig.PGUSER,
    password: dbConfig.PGPASSWORD,
    database: dbConfig.PGDATABASE,
    port: dbConfig.PGPORT,
    ssl: true,
});
console.log("Database Pool Configured");

module.exports = connection;