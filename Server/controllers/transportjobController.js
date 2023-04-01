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

const createNewJob = (req, res) => {
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
