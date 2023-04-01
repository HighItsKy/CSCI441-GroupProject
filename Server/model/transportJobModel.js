const sql = require("./db.js");

class TransportJob {

    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Job`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

}

module.exports = TransportJob;