const sql = require("./db.js");

class Customer {
    constructor(customer) {
        this.customer_id = customer.customer_id;
        this.customer_first_name = customer.customer_first_name;
        this.customer_last_name = customer.customer_last_name;
        this.branch_id = customer.branch_id
    }

    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Customer`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

    static async getCustomer(customerId) {
        try {
            const stmt = `SELECT * FROM Customer cu 
            LEFT JOIN Company_Branch br ON cu.Branch_ID = br.Company_Branch_ID
            LEFT JOIN Company co ON br.Company_ID = co.Company_ID WHERE cu.customer_ID = $1`;
            // /'SELECT * FROM Customer c LEFT JOIN Company_Branch b ON c.Branch_ID = b.Company_Branch_ID WHERE customer_id = $1'
            const res = await sql.query(stmt, [customerId]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }


    static async create(customer) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO Customer(customer_first_name, customer_last_name, branch_id) VALUES ($1, $2, $3) RETURNING Customer_ID',
                [customer.customer_first_name, customer.customer_last_name, customer.branch_id]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

    static async update(customer) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'UPDATE Customer SET customer_first_name = $1, customer_last_name = $2, branch_id = $3 WHERE Customer_ID = $4 RETURNING Customer_ID',
                [customer.customer_first_name, customer.customer_last_name, customer.branch_id, customer.customer_id]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }



}

module.exports = Customer;