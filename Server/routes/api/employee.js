const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');

router.route('/')
    .get(employeeController.getAll)
    .post(employeeController.createEmployee)

router.route("/:employeeId")
    .get(employeeController.getEmployee);

module.exports = router;