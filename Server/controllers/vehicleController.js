const Vehicle = require("../model/vehicleModel")

const getAll = async (req, res) => {
    try {
        let data = await Vehicle.getAll();
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving vehicles."
        });
    }
}

module.exports = {
    getAll
}