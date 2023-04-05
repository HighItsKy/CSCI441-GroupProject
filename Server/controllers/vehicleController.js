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

const getVehicle = async (req, res) => {
    try {
        data = await Vehicle.getVehicle(req.params.vehicleId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Vehicle with id " + req.params.vehicleId + " " + err.message
        });
    }
};

const createVehicle = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Create a Property
    const newVehicle = new Vehicle(req.body);
    try {
        let data = await Vehicle.create(newVehicle);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the vehicle."
        });
    }
};

module.exports = {
    getAll,
    getVehicle,
    createVehicle
}