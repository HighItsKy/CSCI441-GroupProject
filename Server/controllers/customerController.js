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

module.exports = {
    getAll
}