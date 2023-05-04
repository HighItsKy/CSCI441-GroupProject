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

const getEmployee = async (req, res) => {
    try {
        data = await Employee.getEmployee(req.params.employeeId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.employeeId + " " + err.message
        });
    }
};

const getDriverJobs = async (req, res) => {
    try {
        data = await Employee.getDriverJobs(req.params.driverId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.driverId + " " + err.message
        });
    }
};

const createEmployee = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const newEmp = new Employee(req.body)
    try {
        let data = await Employee.create(newEmp);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            error: err,
            message:
                err.message ||
                "Some error occurred while creating the employee."
        });
    }
}

const updateEmployee = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const newEmp = new Employee(req.body)
    try {
        let data = await Employee.update(newEmp);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            error: err,
            message:
                err.message ||
                "Some error occurred while creating the employee."
        });
    }
}

module.exports = {
    getAll,
    getEmployee,
    getDriverJobs,
    createEmployee,
    updateEmployee
}