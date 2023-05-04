const sql = require("./db.js");

class TransportJob {
    constructor(job) {
        this.invoice_id = job.invoice_id;
        this.shipper_id = job.shipper_id;
        this.receiver_id = job.receiver_id;
        this.truck_id = job.truck_id;
        this.driver_id = job.driver_id;
        this.intake_id = job.intake_id;
        this.driver_signature = job.driver_signature;
        this.shipper_signature = job.shipper_signature;
        this.receiver_signature = job.receiver_signature;
        this.date_of_order = job.date_of_order;
        this.date_complete = job.date_complete;
        this.job_status = job.job_status;
        this.special_instructions = job.special_instructions

        this.driverName = job.driverName;
        this.shipperName = job.shipperName;
        this.receiverName = job.receiverName;
        this.driverFullName = job.driverFullName;
    }


    static async getAll() {
        try {
            const res = await sql.query(
                `SELECT
                    j.invoice_id, j.shipper_id, j.driver_id, to_char(j.date_of_order, 'YYYY-MM-DD') AS date_of_order, j.sort_job_status AS job_status,
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
                ORDER BY j.sort_job_status, j.Invoice_id`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

    static async getJob(jobId) {
        try {
            const stmt = `SELECT j.invoice_id, j.shipper_id, j.receiver_id, j.truck_id, j.driver_id, j.intake_id, j.driver_signature, j.shipper_signature, to_char(j.date_of_order, 'YYYY-MM-DD') AS date_of_order, j.date_complete, j.special_instructions,
                            t.truck_vin, t.truck_capacity, t.truck_mileage, 
                            s.customer_id AS shipper_customer_id, sb.company_id AS shipper_company_id, s.customer_first_name AS shipper_first_name, s.customer_last_name AS shipper_last_name, s.branch_id AS shipper_branch_id, sc.Company_Name AS shipper_company,
                            sb.branch_name AS shipper_branch_name, sb.branch_contact_no AS shipper_contact_no, sb.branch_street_address AS shipper_street, sb.branch_city AS shipper_city, sb.branch_state AS shipper_state, sb.branch_email AS shipper_email,
                            rb.company_id AS receiver_company_id, r.customer_id AS receiver_customer_id, r.customer_first_name AS receiver_first_name, r.customer_last_name AS receiver_last_name, r.branch_id AS receiver_branch_id, rc.Company_Name AS receiver_company,
                            rb.branch_name AS receiver_branch_name, rb.branch_contact_no AS receiver_contact_no, rb.branch_street_address AS receiver_street, rb.branch_city AS receiver_city, rb.branch_state AS receiver_state, rb.branch_email AS receiver_email
                            FROM Job j
                            LEFT JOIN Truck t ON j.Truck_Id = t.Truck_Id
                            LEFT JOIN Customer s ON j.Shipper_ID = s.Customer_ID
                            LEFT JOIN Customer r ON j.Receiver_ID = r.Customer_ID
                            LEFT JOIN Company_Branch sb on s.branch_id = sb.company_branch_id
                            LEFT JOIN Company_Branch rb on r.branch_id = rb.company_branch_id
                            LEFT JOIN Company sc on sb.Company_ID = sc.Company_ID
                            LEFT JOIN Company rc on rb.Company_ID = rc.Company_ID
                            WHERE j.invoice_id = $1`

            //'SELECT * FROM Job WHERE invoice_id = $1'
            const res = await sql.query(stmt, [jobId]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async getCarLineItems(jobId) {
        try {
            const res = await sql.query('SELECT * FROM Car_Line_Item cli LEFT JOIN Vehicle veh ON cli.Vehicle_Id = veh.Vehicle_Id WHERE invoice_id = $1', [jobId]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async create(job) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO Job(Shipper_ID, Receiver_ID, Truck_ID, Driver_ID, Intake_ID, Driver_signature, Shipper_Signature, Receiver_Signature, Sort_Job_Status, Special_Instructions, Date_of_Order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING Invoice_ID',
                [job.shipper_id, job.receiver_id, job.truck_id, job.driver_id, job.intake_id, job.driver_signature, job.shipper_signature, job.receiver_signature, job.job_status, job.special_instructions]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

    static async update(updateJob) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                `UPDATE Job 
                SET 
                    Shipper_ID = $1, Receiver_ID = $2, Truck_ID = $3, Driver_ID = $4, Intake_ID = $5, 
                    Driver_signature = $6, Shipper_Signature = $7, Receiver_Signature = $8, Job_Status = $9, 
                    Special_Instructions = $10, Date_of_Order = $11 WHERE invoice_id = $12`,
                [updateJob.shipper_id, updateJob.receiver_id, updateJob.truck_id, updateJob.driver_id, updateJob.intake_id,
                updateJob.driver_signature, updateJob.shipper_signature, updateJob.receiver_signature, updateJob.job_status,
                updateJob.special_instructions, updateJob.date_of_order, updateJob.invoice_id]
            );
            client.release();
            return data1.rowCount;
        }
        catch (err) {
            throw err;
        }
    }

    static async updateJobStatus(jobId, newJobStatus) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'UPDATE Job SET job_status = $1 WHERE invoice_id = $2',
                [newJobStatus, jobId]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

    static async updateDriver(jobId, newDriverId) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'UPDATE Job SET driver_id = $1 WHERE invoice_id = $2',
                [newDriverId, jobId]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = TransportJob;