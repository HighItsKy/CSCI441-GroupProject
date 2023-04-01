const db = require('../model/db')
const Company = require("../model/companyModel")

const getCompanies = async (req, res) => {
    try {
        let data = await Company.getAll();
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving companies."
        });
    }
}

const getCompany = async (req, res) => {
    try {
        data = await Company.getCompany(req.params.companyId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Company with id " + req.params.companyId + " " + err.message
        });
    }
}

const getCompanyBranches = async (req, res) => {
    try {
        data = await Company.getCompanyBranches(req.params.companyId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving branches for Company with id " + req.params.companyId + " " + err.message
        })
    }
}

// class Company {
//     static async getAll() {
//         let sqlString = `select * FROM Company`;
//         try {
//             let res = await db.query(sqlString);
//             console.log(res.rows);
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     static async getCompany(req) {
//         if (!req?.params?.companyId) return res.status(400).json({'message': 'CompanyId required.'});
//         let sqlString = `SELECT * FROM Company WHERE Company_ID = ${req.params.companyId}`
//         try {
//             let res = await db.query(sqlString);
//             console.log(res.rows);
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     static async getCompanyBranches(req) {
//         if (!req?.params?.companyId) return res.status(400).json({ 'message': 'CompanyId required.' });
//         let sqlString = `SELECT * FROM Company_Branch WHERE Company_ID = ${req.params.companyId}`;
//         try {
//             let res = await db.query(sqlString);
//             console.log(res.rows);
//         } catch (err) {
//             console.error(err);
//         }
//     }
// }

module.exports = {
    getCompanies,
    getCompany,
    getCompanyBranches
};