const db = require('../model/db')
const {Branch, Company} = require("../model/companyModel")


const getCompanies = async (req, res) => {
    try {
        let data = await Company.getAll();
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving companies."
        });
    }
}

const getCompany = async (req, res) => {
    try {
        data = await Company.getCompany(req.params.companyId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Company with id " + req.params.companyId + " " + err.message
        });
    }
}

const getCompanyBranches = async (req, res) => {
    try {
        data = await Company.getCompanyBranches(req.params.companyId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving branches for Company with id " + req.params.companyId + " " + err.message
        })
    }
}

const getBranch = async (req, res) => {
    try {
        data = await Branch.getBranch(req.params.branchId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Branch with id " + req.params.branchId + " " + err.message
        });
    }
}

const getBranchCustomers = async (req, res) => {
    try {
        data = await Branch.getBranchCustomers(req.params.companyId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving branches for Company with id " + req.params.companyId + " " + err.message
        })
    }
}

const createCompany = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const newComp = new Company(req.body)
    try {
        let data = await Company.create(newComp);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            error: err,
            message:
                err.message ||
                "Some error occurred while creating the company."
        });
    }
}

const createBranch= async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    if (!req?.params?.companyId) {
        res.status(400).send({
            message: "companyId required to create new branch."
        })
    }
    
    const newBranch = new Branch(req.body);
    newBranch.company_id = req.params.companyId;

    try {
        let data = await Branch.create(newBranch);
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            error: err,
            message:
                err.message ||
                "Some error occurred while creating the company branch."
        });
    }
};


module.exports = {
    getCompanies,
    getCompany,
    getCompanyBranches,
    getBranchCustomers,
    getBranch,
    createBranch,
    createCompany
};