const sql = require("./db.js");

class Vehicle {
    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Vehicle`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

}

module.exports = Vehicle;