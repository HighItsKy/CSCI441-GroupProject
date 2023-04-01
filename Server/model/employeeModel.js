const sql = require("./db.js");

class Employee {
    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Employee`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

}

module.exports = Employee;