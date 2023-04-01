const sql = require("./db.js");

class Customer {
    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Customer`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

}

module.exports = Customer;