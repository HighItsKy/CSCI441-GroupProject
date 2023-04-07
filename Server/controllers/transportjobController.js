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

const getJob = async (req, res) => {
    try {
        data = await Job.getJob(req.params.jobId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Job with id " + req.params.jobId + " " + err.message
        });
    }
}

const getCarLineItems = async (req, res) => {
    try {
        data = await Job.getCarLineItems(req.params.jobId);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Job with id " + req.params.jobId + " " + err.message
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

const updateJobStatus = async (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    if (!req.body.invoice_id){
        res.status(400).send({
            message: "Content must include an invoice_id"
        })
    }
    if (!req.body.current_job_status){
        res.status(400).send({
            message: "Content must include a current_job_status"
        })
    }
    try {
        const jobId = req.body.invoice_id;
        const currentJobStatus = req.body.current_job_status;
        const newJobStatus = currentJobStatus == 'Pending' ? 'Loading' :
                currentJobStatus == 'Loading' ? 'Arrived' :
                currentJobStatus == 'Arrived' ? 'Unloaded' : 'Complete';
        let data = await Job.updateJobStatus(jobId, newJobStatus);        
        if (data === 0)
            res.status(404).send({
                message: `Not found Job with id ${jobId}.`
            });
        else
            res.send('{"message": "success"}');
    } catch (err) {
        res.status(500).send({
            message: `Error updating Job with id ${jobId}`
        });
    }
};

const updateDriver = async (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    if (!req.body.invoice_id) {
        res.status(400).send({
            message: "Content must include an invoice_id"
        })
    }
    if (!req.body.employee_id) {
        res.status(400).send({
            message: "Content must include an employee_id"
        })
    }
    try {
        let data = await Job.updateDriver(req.body.invoice_id, req.body.employee_id);
        if (data === 0)
            res.status(404).send({
                message: `Not found Job with id ${req.body.invoice_id}.`
            });
        else
            res.send('{"message": "success"}');
    } catch (err) {
        res.status(500).send({
            message: `Error updating Job with id ${req.body.invoice_id}`
        });
    }
};

const deleteJob = (req, res) => {
};



module.exports = {
    getAll,
    getJob,
    getCarLineItems,
    createNewJob,
    updateJob,
    updateJobStatus,
    updateDriver,
    deleteJob,
};
