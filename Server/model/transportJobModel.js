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
    }


    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Job`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

    static async create(job) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO Job(Shipper_ID, Receiver_ID, Truck_ID, Driver_ID, Intake_ID, Driver_signature, Shipper_Signature, Receiver_Signature, Job_Status, Special_Instructions, Date_of_Order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING Invoice_ID',
                [job.shipper_id, job.receiver_id, job.truck_id, job.driver_id, job.intake_id, job.driver_signature, job.shipper_signature, job.receiver_signature, job.job_status, job.special_instructions]
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