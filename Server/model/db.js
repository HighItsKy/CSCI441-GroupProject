const { Pool } = require("pg");

const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = new Pool({
    user: dbConfig.PGUSER,
    host: dbConfig.PGHOST,
    database: dbConfig.PGDATABASE,
    password: dbConfig.PGPASSWORD,
    port: dbConfig.PGPORT,
})

// open the MySQL connection
connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;