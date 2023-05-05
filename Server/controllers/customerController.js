const Customer = require("../model/customerModel")

const getAll = async (req, res) => {
    try {
        let data = await Customer.getAll();
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving customers."
        });
    }
}

const getCustomer = async (req, res) => {
    try {
        data = await Customer.getCustomer(req.params.customerId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId + " " + err.message
        });
    }
}

// will need to be tested. Assumes a FK branch_id is included in the customer table
const createCustomer = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // if (!req?.params?.companyId) {
    //     res.status(400).send({
    //         message: "companyId required to create new customer."
    //     })
    // }

    const newCustomer = new Customer(req.body);

    try {
        let data = await Customer.create(newCustomer);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            error: err,
            message:
                err.message ||
                "Some error occurred while creating the customer."
        });
    }
};

const updateCustomer = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // if (!req?.params?.companyId) {
    //     res.status(400).send({
    //         message: "companyId required to create new customer."
    //     })
    // }

    const newCustomer = new Customer(req.body);

    try {
        let data = await Customer.update(newCustomer);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            error: err,
            message:
                err.message ||
                "Some error occurred while creating the customer."
        });
    }
};

module.exports = {
    getAll,
    getCustomer,
    createCustomer,
    updateCustomer
}