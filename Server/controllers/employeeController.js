const Employee = require("../model/employeeModel")

const getAll = async (req, res) => {
    try {
        let data = await Employee.getAll();
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving employees."
        });
    }
}

module.exports = {
    getAll
}