const { Pool, Client } = require("pg");

const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = new Pool({
    host: dbConfig.PGHOST,
    user: dbConfig.PGUSER,
    password: dbConfig.PGPASSWORD,
    database: dbConfig.PGDATABASE,
    port: dbConfig.PGPORT,
    ssl: true,
});

module.exports = connection;