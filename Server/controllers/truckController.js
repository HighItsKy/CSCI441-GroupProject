const Truck = require("../model/trucksmodel.js");

const getTrucks = async (req, res) => {
    try {
        let data = await Truck.getAll();
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving trucks."
        });
    }
};

const createNewTruck = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Create a Property
    const newTruck = new Truck(req.body);
    try {
        let data = await Truck.create(newTruck);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the truck."
        });
    }
};

const updateTruck = async (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const updateTruck = new Truck(req.body);
    try {
        let data = await Truck.update(updateTruck);
        if (data === 0)
            res.status(404).send({
                message: `Not found Truck with id ${req.body.truck_id}.`
            });
        else
            res.send('{"message": "success"}');
    } catch (err) {
        res.status(500).send({
            message: `Error updating Truck with id ${req.body.truck_id}`
        });
    }
};

const deleteTruck = async (req, res) => {
    try {
        let data = await Truck.delete(req.body.truck_id)
        if (data === 0)
            res.status(404).send({
                message: `Not found Truck with id ${req.body.truck_id}.`
            });
        else
            res.send('{"message": "success"}');
    } catch (err) {
        res.status(500).send({
            message: `Error updating Job with id ${req.body.truckId}`
        });
    }
};

const getTruck = async (req, res) => {
    try {
        data = await Truck.findById(req.params.truckId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Truck with id " + req.params.truckId + " " + err.message
        });
    }
};

module.exports = {
    getTrucks,
    createNewTruck,
    updateTruck,
    deleteTruck,
    getTruck,
};