const sql = require("./db.js");

class Customer {
    constructor(customer) {
        this.customer_id = customer.customer_id;
        this.customer_first_name = customer.customer_first_name;
        this.customer_last_name = customer.customer_last_name;
        this.branch_name = customer.branch_name
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
            const res = await sql.query('SELECT * FROM Customer WHERE customer_id = $1', [customerId]);
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
                [customer.customer_first_name, customer.customer_last_name, customer.branchId]
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