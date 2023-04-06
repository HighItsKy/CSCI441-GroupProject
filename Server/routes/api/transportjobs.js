const express = require('express');
const router = express.Router();
const transportController = require('../../controllers/transportjobController');

router.route('/')
    .get(transportController.getAll)
    .post(transportController.createNewJob)
    // .put(transportController.updateJob)
    // .delete(transportController.deleteJob);

// router.route('/:DriverID')
//     .get(transportController.GetDriverJobs)

router.route('/:jobId')
    .get(transportController.getJob);

router.route('/:jobId/carLineItems')
    .get(transportController.getCarLineItems)

router.route('/job/updateJobStatus')
    .put(transportController.updateJobStatus) // Not yet tested. takes in an invoice_id and current_job_status and updates the job to the next job_status

module.exports = router;