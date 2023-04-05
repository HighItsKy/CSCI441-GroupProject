const sql = require("./db.js");

class Company {
    constructor(company) {
        this.company_id = company.company_id;
        this.company_name = company.company_name;
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

    static async create(company) {

        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO Company(Company_Name) VALUES ($1) RETURNING Company_ID',
                [company.company_name]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

    
}

class Branch {
    constructor(branch) {
        this.company_branch_id = branch.company_branch_id;
        this.company_id = branch.company_id;
        this.branch_name = branch.branch_name;
        this.branch_contact_no = branch.branch_contact_no;
        this.branch_street_address = branch.branch_street_address;
        this.branch_city = branch.branch_city;
        this.branch_state = branch.branch_state;
        this.branch_zip_code = branch.branch_zip_code;
        this.branch_email = branch.branch_email;
    }

    static async getBranch(branchId) {
        try {
            const res = await sql.query('SELECT * FROM Company_Branch WHERE company_branch_id = $1', [branchId]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async getBranchCustomers(branchId) {
        try {
            const res = await sql.query(`SELECT * FROM Customer WHERE branch_id = $1`, [branchId])
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async create(branch) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO Company_Branch(Company_ID, Branch_Name, Branch_Contact_No, Branch_Street_Address, Branch_City, Branch_State, Branch_Zip_Code, Branch_Email) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING Company_Branch_ID',
                [branch.company_id, branch.branch_name, branch.branch_contact_no, branch.branch_street_address, branch.branch_city, branch.branch_state, branch.branch_zip_code, branch.branch_email]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = {
    Company,
    Branch
}