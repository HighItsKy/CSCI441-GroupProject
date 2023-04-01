const sql = require("./db.js");

class Company {
    constructor(company) {
        this.company_id = company.company_id;
        this.compnay_name = company.company_name;
    }

    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Company`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

    static async getCompany(companyId) {
        try {
            const res = await sql.query('SELECT * FROM Company WHERE company_id = $1', [companyId]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async getCompanyBranches(companyId) {
        try {
            const res = await sql.query(`SELECT * FROM Company_Branch WHERE company_id = $1`, [companyId])
            return res.rows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Company;