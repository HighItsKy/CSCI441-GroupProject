const sql = require("./db.js");

// constructor
class Truck {

    constructor(truck) {
        this.truck_id = truck.truck_id;
        this.truck_vin = truck.truck_vin;
        this.truck_max_load = truck.truck_max_load;
        this.truck_capacity = truck.truck_capacity;
        this.mileage = truck.truck_mileage;
    }

    static async getAll(result) {
        try {
            const res = await sql.query('SELECT * FROM TRUCK');
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async create(newTruck) {

        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO TRUCK(truck_vin, truck_max_load, truck_capacity, truck_mileage) VALUES ( $1, $2, $3, $4 ) RETURNING truck_id',
                [newTruck.truck_vin, newTruck.truck_max_load, newTruck.truck_capacity, newTruck.truck_mileage]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

    static async findById(truckId) {
        try {
            const res = await sql.query('SELECT * FROM TRUCK WHERE truck_id = $1', [truckId]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async update(updateTruck) {

        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'UPDATE TRUCK SET truck_vin = $1, truck_max_load = $2, truck_capacity = $3, truck_mileage = $4 WHERE truck_id = $5',
                [updateTruck.truck_vin, updateTruck.truck_max_load, updateTruck.truck_capacity, updateTruck.truck_mileage, updateTruck.truck_id]
            );
            client.release();
            return data1.rowCount;
        }
        catch (err) {
            throw err;
        }
    }

    static async delete(truckId) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'DELETE FROM TRUCK WHERE truck_id = $1',
                [truckId]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = Truck;