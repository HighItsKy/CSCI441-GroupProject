const express = require('express');
const router = express.Router();
const transportController = require('../../controllers/transportjobController');

router.route('/')
    .get(transportController.getAll)
    .post(transportController.createNewJob)
    .put(transportController.updateJob)
    // .delete(transportController.deleteJob);

// router.route('/:DriverID')
//     .get(transportController.GetDriverJobs)

router.route('/:jobId')
    .get(transportController.getJob);

router.route('/:jobId/carLineItems')
    .get(transportController.getCarLineItems)


//takes in an invoice_id and current_job_status and updates the job to the next job_status
router.route('/updateJobStatus')
    .put(transportController.updateJobStatus)

// takes in an invoice_id and employee_id and assigns that employee as the driver of the job
router.route('/updateDriver')
     .put(transportController.updateDriver)

module.exports = router;