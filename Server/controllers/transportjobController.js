const Job = require("../model/transportJobModel")

const getAll = async (req, res) => {
    try {
        let data = await Job.getAll();
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving jobs."
        });
    }
}

const createNewJob = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const newJob = new Job(req.body)
    //newJob.date_of_order = Date.now().toISOString();
    newJob.job_status = "Pending";
    try {
        let data = await Job.create(newJob);
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
};

const updateJob = (req, res) => {
};

const deleteJob = (req, res) => {
};

const getJob = (req, res) => {
};

module.exports = {
    getAll,
    createNewJob,
    updateJob,
    deleteJob,
    getJob,
};
