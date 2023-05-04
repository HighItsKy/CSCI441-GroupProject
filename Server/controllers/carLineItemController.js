const CLI = require("../model/carLineItemModel")

const getAll = async (req, res) => {
    try {
        let data = await CLI.getAll(req.query.invoice_id);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving car line item."
        });
    }
}

const getCarLineItem = async (req, res) => {
    try {
        data = await CLI.getCarLineItem(req.params.carLineItemId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving car line item with id " + req.params.carLineItemId + " " + err.message
        });
    }
};

const createCarLineItem = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Create a Property
    const newCLI = new CLI(req.body);
    try {
        let data = await CLI.create(newCLI);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the car line item."
        });
    }
};


const updateCarLineItem = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Create a Property
    const newCLI = new CLI(req.body);
    try {
        let data = await CLI.update(newCLI);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the car line item."
        });
    }
}

module.exports = {
    getAll,
    getCarLineItem,
    createCarLineItem,
    updateCarLineItem
}