const { Pool, Client } = require("pg");

const dbConfig = require("../config/db.config.js");


// Create a connection to the database
const connection = new Pool({
    user: dbConfig.PGUSER,
    host: dbConfig.PGHOST,
    database: dbConfig.PGDATABASE,
    password: dbConfig.PGPASSWORD,
    port: dbConfig.PGPORT,
});

console.log(dbConfig.CONNECTIONSTRING);
const client = new Client(
    dbConfig.CONNECTIONSTRING,
)

// open the  connection
/*connection.connect((error) => {
    if (error) { console.log(error); }
    else { console.log("Successfully connected to the database."); }
});
*/

client.connect();

client.query('SELECT * from Truck', [], (err, res) => {
    console.log(err ? "error" : res.rows[0]);
    client.end;
});

module.exports = connection;