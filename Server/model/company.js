// const client = require('./db')

class Company {
    // static getAll() {
    //     let sqlString = `select * FROM Company`;
    //     client.query(sqlString, [], (err, res) => {
    //         if (err) console.log(err);
    //         console.log(res.rows)
    //     })
    // }
    // static create(companyName) {
    //     let sqlString = `INSERT INTO Company (Company_Name) VALUES('${companyName}')`
    //     console.log(client)
    //     client.query(sqlString, (err, res) => {
    //         if (err) {
    //             console.log("Error: " , err);
    //             res(err, null);
    //             return;
    //         }
    //         console.log(res)
    //         res(null, {Company_ID: res.insertId})
    //     })
    // }
}

module.exports = Company;