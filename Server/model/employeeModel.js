const sql = require("./db.js");

class Employee {
    constructor(emp) {
        this.employee_id = emp.employee_id;
        this.is_admin = emp.is_admin;
        this.is_driver = emp.is_driver;
        this.employee_first_name = emp.employee_first_name;
        this.employee_last_name = emp.employee_last_name;
        this.employee_username = emp.employee_username;
        this.employee_password = emp.employee_password;
        this.employee_contact_no = emp.employee_contact_no;
        this.employee_street_address = emp.employee_street_address;
        this.employee_city = emp.employee_city;
        this.employee_state = emp.employee_state;
        this.employee_zip_code = emp.employee_zip_code;
        this.employee_email = emp.employee_email;
    }

    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Employee`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

    static async getEmployee(empID) {
        try {
            const res = await sql.query('SELECT * FROM Employee WHERE employee_id = $1', [empID]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async getDriverJobs(empID) {
        try {
            const res = await sql.query(
                `SELECT 
                    j.invoice_id, j.shipper_id, j.driver_id, j.date_of_order, j.sort_job_status AS job_status,
                concat(e.employee_first_name, ' ', e.employee_last_name) as full_name,
                s.customer_first_name AS shipper_first_name, s.customer_last_name AS shipper_last_name,
                sc.Company_Name AS shipper_company,
                rc.Company_Name AS receiver_company                    
                FROM 
                    Job j 
                INNER JOIN Employee e ON j.driver_id = e.employee_id
                JOIN Customer s ON j.Shipper_ID = s.Customer_ID
                JOIN Company_Branch sb on s.branch_id = sb.company_branch_id
                JOIN Company sc on sb.Company_ID = sc.Company_ID
                JOIN Customer r ON j.Receiver_ID = r.Customer_ID
                JOIN Company_Branch rb on r.branch_id = rb.company_branch_id
                JOIN Company rc on rb.Company_ID = rc.Company_ID
                WHERE j.driver_id = $1
                ORDER BY j.sort_job_status, j.invoice_id`, [empID]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async create(newEmp) {

        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO Employee(Is_Admin, Is_Driver, Employee_First_Name, Employee_Last_Name, Employee_Username, Employee_Password, Employee_Contact_No, Employee_Street_Address, Employee_City, Employee_State, Employee_Zip_Code, Employee_Email) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ) RETURNING Employee_ID',
                [newEmp.is_admin, newEmp.is_driver, newEmp.employee_first_name, newEmp.employee_last_name, newEmp.employee_username, newEmp.employee_password, newEmp.employee_contact_no, newEmp.employee_street_address, newEmp.employee_city, newEmp.employee_state, newEmp.employee_zip_code, newEmp.employee_email]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = Employee;