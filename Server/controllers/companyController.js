const db = require('../model/db')



class Company {
    static async getAll() {
        let sqlString = `select * FROM Company`;
        try {
            let res = await db.query(sqlString);
            console.log(res.rows);
        } catch (err) {
            console.error(err)
        }
    }

    static async getCompany(req) {
        if (!req?.params?.companyId) return res.status(400).json({'message': 'CompanyId required.'});
        let sqlString = `SELECT * FROM Company WHERE Company_ID = ${req.params.companyId}`
        try {
            let res = await db.query(sqlString);
            console.log(res.rows);
        } catch (err) {
            console.error(err);
        }
    }

    static async getCompanyBranches(req) {
        if (!req?.params?.companyId) return res.status(400).json({ 'message': 'CompanyId required.' });
        let sqlString = `SELECT * FROM Company_Branch WHERE Company_ID = ${req.params.companyId}`;
        try {
            let res = await db.query(sqlString);
            console.log(res.rows);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = Company;