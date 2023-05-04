const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');

router.route('/')
    .get(employeeController.getAll)
    .post(employeeController.createEmployee)
    .put(employeeController.updateEmployee)


router.route("/:employeeId")
    .get(employeeController.getEmployee);

router.route("/:driverId/jobs")
    // returns all jobs where employeeId is the driver of the job
    // note if you need all jobs for an admin user, use axios.get("/job")
    .get(employeeController.getDriverJobs)

module.exports = router;