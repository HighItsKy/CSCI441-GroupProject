const sql = require("./db.js");

class CarLineItem {
    constructor(cli) {
        this.car_line_item_id = cli.car_line_item_id;
        this.vehicle_id = cli.vehicle_id;
        this.invoice_id = cli.invoice_id;
        this.line_drawing = cli.line_drawing;
        this.shipping_cost = cli.shipping_cost;
        this.notes = cli.notes;
    }

    static async getAll(invId) {
        try {
            const res = await sql.query(`SELECT * FROM Car_Line_Item WHERE Invoice_ID = $1`, [invId]);
            return res.rows;
        } catch (err) {
            throw err
        }
    }

    static async getCarLineItem(cliId) {
        try {
            const res = await sql.query('SELECT * FROM Car_Line_Item WHERE Car_Line_Item_ID = $1', [cliId]);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }

    static async create(cli) {
        try {
            let client = await sql.connect();
            let data1 = await client.query(
                'INSERT INTO Car_Line_Item(Vehicle_ID, Invoice_ID, Line_drawing, Shipping_Cost, Notes) VALUES ( $1, $2, $3, $4, $5 ) RETURNING Car_Line_Item_ID',
                [cli.vehicle_id, cli.invoice_id, cli.line_drawing, cli.shipping_cost, cli.notes]
            );
            client.release();
            return data1.rows;
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = CarLineItem;