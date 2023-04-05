const sql = require("./db.js");

class Vehicle {
    constructor(vehicle) {
        this.vehicle_id = vehicle.vehicle_id;
        this.vin = vehicle.vin;
        this.vehicle_make = vehicle.vehicle_make;
        this.vehicle_model = vehicle.vehicle_model;
        this.vehicle_year = vehicle.vehicle_year;
        this.vehicle_color = vehicle.vehicle_color;
    }

    static async getAll() {
        try {
            const res = await sql.query(`SELECT * FROM Vehicle`);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

    static async getVehicle(vehId) {
        try {
            const res = await sql.query('SELECT * FROM Vehicle WHERE vehicle_id = $1', [vehId]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async create(veh) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO Vehicle(VIN, Vehicle_Make, Vehicle_Model, Vehicle_Year, Vehicle_Color) VALUES ( $1, $2, $3, $4, $5 ) RETURNING Vehicle_ID',
                [veh.vin, veh.vehicle_make, veh.vehicle_model, veh.vehicle_year, veh.vehicle_color]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = Vehicle;