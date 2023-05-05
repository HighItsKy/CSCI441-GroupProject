const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customerController');

router.route('/')
    .get(customerController.getAll)
    .post(customerController.createCustomer)
    .put(customerController.updateCustomer)

router.route('/:customerId')
    .get(customerController.getCustomer)

// NEEDS TO BE TESTED
// this route is used this way because the user would
// need to include a company and a branch before creating
// a customer. On the job, there would be a company dropdown,
// then a branch dropdown, then a customer dropdown of all
// customers that work for that branch. 
// If a user then wants to add a new customer, they would
// already pass the companyId and branchId to that customer
// router.route('/company/:companyId/branches/:branchId')
//     .post(customerController.createCustomer)

module.exports = router;